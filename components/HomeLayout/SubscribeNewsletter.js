"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useAddSubscriberMutation } from "@/lib/features/adminApi/subscriberSlice";

// Email validation schema
const emailSchema = z.string().email({ message: "Invalid email address" });

const SubscribeNewsletter = () => {
  const [state, setState] = useState({
    email: "",
    error: "",
    success: "",
  });

  const [addSubscriber, { isLoading }] = useAddSubscriberMutation();

  const handleInputChange = (e) => {
    setState({ ...state, email: e.target.value, error: "", success: "" });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault(); // Prevent form reload

    // Validate email
    const result = emailSchema.safeParse(state.email);
    if (!result.success) {
      setState({
        ...state,
        error: result.error.errors[0].message,
        success: "",
      });
      return;
    }

    try {
      const res = await addSubscriber(state.email).unwrap();
      console.log("Subscribed successfully:", res);
      if (res?.status === 200) {
        console.log("Subscribed successfully:", res);
        setState({ email: "", success: res.message, error: "" });
      }else{
        setState({ ...state, error: res?.message || "Subscription failed.", success: "" });
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setState({
        ...state,
        error: error?.data?.message || "Failed to subscribe. Please try again.",
        success: "",
      });
    }finally {
      // Clear messages after 1550ms
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          error: "",
          success: "",
        }));
      }, 1550);
    }
  };

  return (
    <section
      className="mb-12 p-8 rounded-lg text-black"
      style={{ background: "#f3f4f6" }}
    >
      <h2 className="mb-4 text-2xl font-bold text-center">
        Subscribe to Our Newsletter
      </h2>
      <form
        className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        onSubmit={handleSubscribe}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={state.email}
          onChange={handleInputChange}
          className={`flex-grow h-10 w-full rounded-md border px-3 py-2 text-sm text-gray-700 placeholder-gray-500 
            focus:outline-none focus:border-gray-500 ${
              state.error ? "border-red-500" : "border-gray-300"
            }`}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="h-10 px-4 py-2 bg-slate-950 text-white font-medium rounded-md transition-all 
            hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 hover:scale-110 
            disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {/* Error & Success Messages */}
      {state.error && (
        <p className="text-red-500 text-sm mt-2 text-center">{state.error}</p>
      )}
      {state.success && (
        <p className="text-green-500 text-sm mt-2 text-center">
          {state.success}
        </p>
      )}
    </section>
  );
};

export default SubscribeNewsletter;
