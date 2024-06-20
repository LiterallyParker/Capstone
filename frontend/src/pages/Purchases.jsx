import { useContext, useEffect, useState } from "react";
import { getUserPurchases } from "../api/purchases";
import { AuthContext } from "../context/Auth";
import Invoice from "../components/Invoice";

export default function Purchases() {
  const [purchases, setPurchases] = useState(null);
  const { user, token } = useContext(AuthContext)

  useEffect(() => {
    async function fetchUserPurchases() {
      const response = await getUserPurchases(token)
      setPurchases(response.purchases);
    }
    fetchUserPurchases();
  }, [token])

  return (
    <div className="container">
      <h1 className="title">Purchases</h1>
      {
        user && <>
        <h2>{user.firstname} {user.lastname}</h2>
        <h3>{user.email}</h3>
        </>
      }
      {
        purchases && (
          purchases.map((purchase) => <Invoice purchase={purchase} key={purchase.id}/>)
        )
      }
      {
        !purchases && <p>Buy Somthin'</p>
      }
    </div>
  )
}