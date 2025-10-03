// import { Card, Button, Typography } from "antd";
// import type { Ingredients } from "../App";  //type import from App.tsx, Ingredients is TS interface

// type InventoryProps = {
//     stock: Ingredients;  //object me coffee name,water, milk amount, price
//     resetStock: () => void;
//     earnings: number;
// }

// const InventoryDisplay: React.FC<InventoryProps> = ({stock,earnings, resetStock}) => (

//     <Card title='Inventory levels' className="my-4">
//         <ul className="pl-1">
//             <li>☕ Coffee: {stock.coffee}g</li>  {/*shows current stock levels */}
//             <li>💧 Water: {stock.water}ml</li>
//             <li>🥛 Milk: {stock.milk}ml</li>
//         </ul>
//         <Button danger onClick={resetStock} className="mt-4">Reset Inventory</Button>
//         <Typography.Text strong>Total Earnings: ${earnings.toFixed(2)}</Typography.Text>

//     </Card>
// );

// export default InventoryDisplay;

import { Card, Button, Typography } from "antd";
import type { Ingredients } from "../App"; 
import type { Recipe } from "../App";

type InventoryProps = {
  stock: Ingredients;  
  resetStock: () => void;
  selectedCoffee: string;
  recipes: Record<string, Recipe>;
  earnings: number;
};

const InventoryDisplay: React.FC<InventoryProps> = ({ stock, resetStock, selectedCoffee, recipes, earnings }) => {
  const recipe = recipes[selectedCoffee];
  //const price = typeof recipe?.price === 'number' ? recipe.price : 0;

  return (
    <Card title='Inventory levels' className="my-4">
      <ul className="pl-1">
        <li>☕ Coffee: {stock.coffee}g</li>  
        <li>💧 Water: {stock.water}ml</li>
        <li>🥛 Milk: {stock.milk}ml</li>
      </ul>

      <Typography.Title level={4} className="mt-4">
        Selected Coffee: {selectedCoffee}
      </Typography.Title>

      {recipe ? (
        <>
          <Typography.Text>☕ Coffee needed: {recipe.coffee}g</Typography.Text><br />
          <Typography.Text>💧 Water needed: {recipe.water}ml</Typography.Text><br />
          <Typography.Text>🥛 Milk needed: {recipe.milk}ml</Typography.Text><br />
          {/* <Typography.Text strong>💰 Price: {price !== null ? `$${price.toFixed(2)}` : 'N/A'}</Typography.Text> */}
          {/* <Typography.Text strong>
            💰 Price: {recipe ? `$${recipe.price.toFixed(2)}` : 'N/A'}
            </Typography.Text> */}
          <Typography.Text>💰 Price: {typeof recipe?.price === 'number' ? `$${recipe.price.toFixed(2)}` : 'N/A'}</Typography.Text>
        </>
      ) : (
        <Typography.Text type="secondary">No recipe selected</Typography.Text>
      )}

      <div className="mt-4">
        <Button danger onClick={resetStock}>Reset Inventory</Button>
      </div>

      <Typography.Text strong className="mt-4 block">
        Total Earnings: ${earnings.toFixed(2)}
      </Typography.Text>
    </Card>
  );
};

export default InventoryDisplay;
