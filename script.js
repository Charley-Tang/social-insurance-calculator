function updateValues() {
  try {
    document.getElementById("btn-start").click();
  } catch (error) {
    console.error("触发按钮失败。");
  }
}

// use is by binding context
function onRangeChange(event) {
  this.innerHTML = `${event.target.value}%`;

  updateValues();
}

window.onload = function () {
  const previews = {
    hurt: document.getElementById("hurt-preview"),
    housePersonal: document.getElementById("house-personal-preview"),
    houseCompany: document.getElementById("house-company-preview"),
  };

  const inputs = {
    salary: document.getElementById("salary"),
    hurt: document.getElementById("hurt"),
    housePersonal: document.getElementById("house-personal"),
    houseCompany: document.getElementById("house-company"),
  };

  inputs.salary.oninput = updateValues;
  inputs.hurt.onchange = onRangeChange.bind(previews.hurt);
  inputs.housePersonal.onchange = onRangeChange.bind(previews.housePersonal);
  inputs.houseCompany.onchange = onRangeChange.bind(previews.houseCompany);

  const startBtn = document.getElementById("btn-start");
  const result = document.getElementById("result");

  startBtn.onclick = function () {
    const salaryValue = Number(inputs.salary.value);
    const hurtRate = Number(inputs.hurt.value);
    const housePersonalRate = Number(inputs.housePersonal.value);
    const houseCompanyRate = Number(inputs.houseCompany.value);

    const values = {
      socialPersonal: salaryValue * (8 / 100),
      socialCompany: salaryValue * (20 / 100),

      medicalPersonal: salaryValue * (2 / 100),
      medicalCompany: salaryValue * (10 / 100),

      maternityCompany: salaryValue * (8 / 1000),

      hurt: salaryValue * (hurtRate / 1000),

      unemploymentPersonal: salaryValue * (1 / 100),
      unemploymentCompany: salaryValue * (2 / 100),

      housePersonal: salaryValue * (housePersonalRate / 100),
      houseCompany: salaryValue * (houseCompanyRate / 100),
    };

    values.salary = salaryValue;
    values.salaryAfterTax =
      salaryValue -
      values.socialPersonal -
      values.medicalPersonal -
      values.unemploymentPersonal -
      values.housePersonal;

    Object.keys(values).forEach((key) => {
      values[key] = values[key].toFixed(2);
    });

    // console.info(values);

    result.innerHTML = `
<br/><br/>
税前工资：${values.salary}<br/><br/>

养老保险<br/>
--个人（8%）：${values.socialPersonal}<br/>
--单位（20%）：${values.socialCompany}<br/><br/>
医疗保险<br/>
--个人（2%）：${values.medicalPersonal}<br/>
--单位（10%）：${values.medicalCompany}<br/><br/>
失业保险<br/>
--个人（1%）：${values.unemploymentPersonal}<br/>
--单位（2%）：${values.unemploymentCompany}<br/><br/>
工伤保险<br/>
--单位（${hurtRate / 10}%）：${values.hurt}<br/><br/>
生育保险<br/>
--单位（0.8%）：${values.maternityCompany}<br/><br/>
        

住房公积金<br/>
--个人（${housePersonalRate}%）：${values.housePersonal}<br/>
--单位（${houseCompanyRate}%）：${values.houseCompany}<br/><br/>

税后工资：${values.salaryAfterTax}
`;
  };

  setTimeout(() => {
    startBtn.click();
  }, 100);
};
