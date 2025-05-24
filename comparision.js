let a = [];
let selectedStocks = [];
let avg = [];
let tickerarr=[];
let b1 = document.getElementById("compare");

async function link() {
  try {
    let response = await fetch("./comparison.json");
    a = await response.json();
  } catch (error) {
    console.log(error);
  }
}

function addButtonEventListener(buttonId, stockIndex) {
  let button = document.getElementById(buttonId);
  button.addEventListener("click", () => {
    selectStock(a[stockIndex]);
  });
}
for (let i = 1; i <= 9; i++) {
  addButtonEventListener(`btn${i}`, i - 1);
}

async function selectStock(stock) {
  try {
    let response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock.ticker}&interval=5min&apikey=CIO8HPZ4FOR79R9B`);
    if (response.ok) {
      let data = await response.json();
      displayStock(stock, data);

      

    } 
    else {
      alert("Stock data not found");
    }
  } catch (error) {
    console.log(error);
  }
}

function displayStock(stock, data) {
  console.log(data);

  if (selectedStocks.length < 2) {
    selectedStocks.push({ company: stock.company, data: data });
    console.log(`${stock.company} selected.`);
    tickerarr.push([stock.ticker,stock.company]);
  } else {
    alert("You have already selected 2 stocks.");
  }
}

// b1.addEventListener("click", () => {
//   selectedStocks.forEach(stock => {
//     console.log(stock.data);
    
//     var date=stock.data["Time Series (5min)"];
//     var b = 20;
//     for(var d in date)
//     {
//       var value = date[d];
        
//         if(b> 0)
//         {
//             var c = [d,value["2. high"], value["3. low"]];
//         }
//         console.log(c);
//     }

//   });
// });
b1.addEventListener("click", () => {
  selectedStocks.forEach(stock => {
    // console.log(stock.data);
    // sender code
    window.location.href = "graphedited.html?tickerarr=" + encodeURIComponent(tickerarr);

    // let timeSeries = stock.data["Time Series (5min)"];
    // let b = 20;

    // for (let d in timeSeries) {
    //   if (b > 0) {
    //     let value = timeSeries[d];
    //     let high = parseFloat(value["2. high"]);
    //     let low = parseFloat(value["3. low"]);
    //     let avglh = (high + low) / 2;
    //     avg.push([d, avglh]); 
    //     b--;
    //     console.log(avg);
    //   } else {
    //     break;
    //   }
    // }
  });

  
  
});

link();

