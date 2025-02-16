import Title from "../Title"

const CardTotal = () => {
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="CARD" text2="TOTALS" />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
            <p>Subtotal</p>
            <p>6000 AMD</p>
        </div>
        <hr />
        <div className="flex justify-between">
            <p>Delivery fee</p>
            <p>500 AMD</p>
        </div>
        <hr />
        <div className="flex justify-between">
            <p>Total</p>
            <p>6500 AMD</p>
        </div>
      </div>
    </div>
  )
}

export default CardTotal;