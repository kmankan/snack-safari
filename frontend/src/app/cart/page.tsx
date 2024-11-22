"use client";

import { storeCart } from "@/store/storeCart";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { addOrder } from "@/api/apiOrder";
import { OrderStatus } from "@/types/types";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import { useStoreStripe } from "@/store/storeStripe";
import { handleStripeIntegration } from "@/utils/handleStripe";
export type AppRouterInstance = ReturnType<typeof useRouter>;

export default function Cart() {
  useProtectedRoute();
  const { items, total, updateQuantity, removeItem } = storeCart();
  const router = useRouter() as AppRouterInstance;
  const { setClientSecret, setPaymentIntentId } = useStoreStripe();
  const { items, total, updateQuantity, removeItem } = storeCart();
  const { idToken, firebaseUser } = useAuth();

  const handleCreateOrder = async () => {
    if (firebaseUser) {
      const res = await addOrder(
        firebaseUser.uid,
        total,
        OrderStatus.PENDING,
        items.map((item) => item.id)
      );
      console.log(res);
    }
  };

  console.log("items", items);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-amber-800 mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg shadow-sm mb-4">
                <div className="relative w-24 h-24">
                  <Image
                    src={item.imageUrl || "/placeholder-image.png"}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-500">{item.country}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity! - 1)}
                        className="text-amber-800 hover:text-amber-600"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity! + 1)}
                        className="text-amber-800 hover:text-amber-600"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ${((item.price * item.quantity!) / 100).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${(total / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${(total / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => {
                    handleStripeIntegration(
                      items,
                      idToken || "",
                      setClientSecret,
                      setPaymentIntentId,
                      router
                    )
                      .then(() => handleCreateOrder())
                      .catch((error) => console.error(error));
                  }}
                  className="w-full bg-amber-500 text-white py-2 mt-8 rounded-full hover:bg-amber-600 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
