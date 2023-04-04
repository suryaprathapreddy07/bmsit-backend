const cron = require("node-cron");
const nodemailer = require("nodemailer");
const fs = require("fs");
const { getAllEmployees } = require("../employees/employees.model");
const { getPayslipById } = require("./payslips.model");
const PDFDocument = require("pdfkit");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "spreddy8951@gmail.com",
    pass: "klyqldyeghomllth",
  },
});

async function generatePayslips(name, [payslipData], callback) {
  try {
    const payslip = new PDFDocument();
    const chunks = [];
    let document;
    payslip.pipe(fs.createWriteStream(`${name}_payslip.pdf`));
    payslip.text(`Payslip for ${name}`);
    payslip.text(`Salary: ${payslipData.base_pay}`);
    payslip.text(`Deductions: ${payslipData.deductions}`);
    payslip.text(`Allowances: ${payslipData.allowances}`);
    payslip.text(
      `Net pay: ${
        payslipData.base_pay - payslipData.deductions + payslipData.allowances
      }`
    );
    payslip.end();
    payslip.on("data", (chunk) => {
      chunks.push(chunk);
    });
    payslip.on("end", () => {
      const payslipPdf = Buffer.concat(chunks);
      callback(payslipPdf);
    });
  } catch (err) {
    console.error(err);
  }
}

function setupPayslipCronJob() {
  cron.schedule("0 0 4 * *", async () => {
    try {
      await getAllEmployees(async (results) => {
        for (const employee of results) {
          getPayslipById(employee.id, async (payslip) => {
            await generatePayslips(employee.name, payslip, (document) => {
              const mailOptions = {
                from: "spreddy8951@gmail.com",
                to: employee.email,
                subject: `Payslip for ${payslip[0].month}/${payslip[0].year}`,
                attachments: [
                  {
                    filename: "payslip.pdf",
                    content: document,
                  },
                ],
              };

              transporter.sendMail(mailOptions);
              console.log("mail sent");
            });
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  });
}

module.exports = { setupPayslipCronJob };
