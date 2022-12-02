function calculateNetSalary(grossSalary) {
    return Math.floor(grossSalary * 45 / 100);
}

function sumSalaries(salaries) {
    return salaries.reduce((a, b) => a + b, 0);
}

function inputToNumber(elementID) {
    let input = document.getElementById(elementID).value;
    return isNaN(input) ? 0 : +input;
}

function capitalizeFirstLastName(text1, text2) {
    return text1.split("").map((x, index) => index === 0 ? x = x.toUpperCase() : x = x.toLowerCase()).join("") +
        " " +
        text2.split("").map((x, index) => index === 0 ? x = x.toUpperCase() : x = x.toLowerCase()).join("")
}

function sumSubsetSalaries(allSalaries, start, end) {
    let result = 0;
    for (let i = start - 1; i < end; i++) {
        result += allSalaries[i];
    }
    return result;
}

function getHighestSalary(list) {
    return list.sort((a,b) => b - a)[0]
}

function getMatchingPersons(employees, find) {
    return employees.filter(x => x.toLowerCase().includes(find.toLowerCase()))
}

function isValideNumber(input) {
    return (input === `${+input}`) ||
        (input === `+${+input}`)
        ? true : false;
}

function isValideEmail(text) {
    if (/^\w+([\.-]?\w+)*@\w+(\.\w{2,3})+$/.test(text)) {
        return "Valid email";
    } else if (/^@\w+(\.\w{2,3})+$/.test(text)) {
        return "Missing username";
    } else if (/^\w+([\.-]?\w+)*@\w+@\w+(\.\w{2,3})+$/.test(text)) {
        return "Can only have one '@' symbol"
    } else if (/^\w+([\.-]?\w+)*@(\.\w{2,3})+$/.test(text)) {
        return "Missing domain name before '.'";
    } else if (/^\w+([\.-]?\w+)*@\w+\.$/.test(text)) {
        return "Missing domain after '.'"
    } else if (/^\w+([\.-]?\w+)*@\w+$/.test(text)) {
        return "Missing '.' symbol"
    } else if (/^\w+([\.-]?\w+)*@\w+\.\w+(\.\w{2,3})+$/.test(text)) {
        return "Can only have one '.' symbol"
    }
}

document
    .getElementById("compute-gross-salary")
    .addEventListener("click", (e) => {
        e.preventDefault();

        let salary = inputToNumber("gross-salary");

        const rez = document.getElementById("result-gross-salary");
        rez.innerText = calculateNetSalary(salary);
    });

document.getElementById("compute-number-sum")
    .addEventListener("click", (e) => {
        e.preventDefault();
        let input = [];

        for (let i = 1; i <= 5; i++) {
            input.push(inputToNumber("number-" + i));
        }

        document.getElementById("number-sum").innerText = sumSalaries(input);
    });

document
    .getElementById("compute-salary-index")
    .addEventListener("click", (e) => {
        e.preventDefault();
        let from = inputToNumber("index-1");
        let until = inputToNumber("index-2");

        let salaries = [];
        for (let i = 1; i < 11; i++) {
            let row = document.getElementsByTagName("tr")[i];
            let value = row.getElementsByTagName("td")[1];
            value = value.innerText;
            salaries.push(parseInt(value));
        }

        document.getElementById("result-salary-index").innerText = sumSubsetSalaries(salaries, Math.min(from, until), Math.max(from, until));
    });

document.getElementById("capitalize").addEventListener("click", (e) => {
    e.preventDefault();

    let text1 = document.getElementById("to-capitalize-1").value;
    let text2 = document.getElementById("to-capitalize-2").value;

    document.getElementById("result-to-capitalize").innerText = capitalizeFirstLastName(
        text1,
        text2
    );
});

document
    .getElementById("compute-is-a-number")
    .addEventListener("click", (e) => {
        e.preventDefault();
        let text = document.getElementById("is-a-number").value;
        let rez = document.getElementById("result-is-a-number");

        if (isValideNumber(text)) {
            rez.innerText = "Valid number";
        } else {
            rez.innerText = "Not a number";
        }
    });

document.getElementById("compute-is-email").addEventListener("click", (e) => {
    e.preventDefault();
    let text = document.getElementById("is-email").value;
    let rez = document.getElementById("result-is-email");

    rez.innerText = isValideEmail(text);
});

document.getElementById("compute-find-max").addEventListener("click", (e) => {
    e.preventDefault();
    let list = [];

    for (let i = 1; i < 6; i++) {
        list.push(inputToNumber("find-max-" + i));
    }

    document.getElementById("result-find-max").innerText = getHighestSalary(list);
});

document
    .getElementById("compute-contains-filter")
    .addEventListener("click", (e) => {
        e.preventDefault();

        let list = [];
        let max = document.getElementsByClassName('list-group')[0].children.length
        for (let i = 0; i < max; i++) {
            list.push(document.getElementsByClassName('list-group')[0].children[i].innerText)
        }
        let filtered = getMatchingPersons(
            list,
            document.getElementById("contains-filter").value
        );

        let out = "";
        for (let i = 0; i < filtered.length; i++) {
            out += '<li class="list-group-item">' + filtered[i] + "</li>";
        }

        document.getElementById("contains-output").innerHTML = out;
    });
