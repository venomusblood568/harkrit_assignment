import express from 'express';
const app = express();

app.use(express.json());
const PORT = 3000;
// link of the server => http://localhost:3000

let ETH_BALANCE = 200;
let USDC_BALANCE = 700000;

// route to add liquidity
app.post('/add_liquidity', (req, res) => {
    // parse the amounts as numbers
    const ethAmount = parseFloat(req.body.ethAmount);
    const usdcAmount = parseFloat(req.body.usdcAmount);

    // update balances
    ETH_BALANCE += ethAmount;
    USDC_BALANCE += usdcAmount;

    // send response
    res.json({
        message: `Added ${ethAmount} ETH and ${usdcAmount} USDC to the liquidity pool.`,
        ETH_BALANCE,
        USDC_BALANCE
    });
});

//route to buy asset
app.post('/buy-asset',(req,res) => {
    const {quantity} = req.body;
    const updateEthQuantity = ETH_BALANCE - quantity;
    const updateUsdcBalance = (ETH_BALANCE * USDC_BALANCE) / updateEthQuantity;
    const paidAmount = parseFloat(updateUsdcBalance - USDC_BALANCE).toFixed(2);
    ETH_BALANCE = updateEthQuantity;
    USDC_BALANCE = parseFloat(updateUsdcBalance).toFixed(2);

    res.json({
        message: `You paid ${paidAmount} USDC for ${quantity} ETH`,
        ETH_BALANCE,
        USDC_BALANCE
    });
})

app.post("/sell-asset",(req,res) =>{
    const quantity = req.body.quantity;
    const updateEthQuantity = ETH_BALANCE + quantity;
    const updateUsdcBalance = (ETH_BALANCE * USDC_BALANCE) / updateEthQuantity;
    const receivedAmount = parseFloat(USDC_BALANCE - updateUsdcBalance).toFixed(2);
    ETH_BALANCE = updateEthQuantity;
    USDC_BALANCE = updateUsdcBalance;
    res.json({
        message: `you received ${receivedAmount} USDC for ${quantity} ETH`,
        ETH_BALANCE,
        USDC_BALANCE
    })
})

app.post("/quote",(req, res) =>{
    const quantity = req.body.quantity;
    const type = req.body.type;

    if(type === 'buy'){
        const updatedEthQuantity = ETH_BALANCE - quantity;
        const updatedUsdcBalance = (ETH_BALANCE * USDC_BALANCE) / updatedEthQuantity;
        const paidAmount = parseFloat(updatedUsdcBalance - USDC_BALANCE).toFixed(2);
        res.json({
            message: `You will pay ${paidAmount} USDC for ${quantity} ETH`
        });
    }
    else if( type === 'sell'){
        const updatedEthQuantity = ETH_BALANCE + quantity;
        const updatedUsdcBalance = (ETH_BALANCE * USDC_BALANCE) / updatedEthQuantity;
        const receivedAmount = parseFloat(USDC_BALANCE - updatedUsdcBalance).toFixed(2);
        res.json({
            message: `You will receive ${receivedAmount} USDC for ${quantity} ETH`
        });
    }
    else{
        res.status(400).json({
            message: "Invalid type. Please specify 'buy' or 'sell'."
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
