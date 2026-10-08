import { Suspense } from "react";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto px-4 py-16">
          <div className="bg-white rounded-xl border p-6 md:p-8 animate-pulse">
            <div className="h-8 w-32 bg-gray-200 rounded mx-auto mb-6" />
            <div className="space-y-4">
              <div className="h-11 bg-gray-100 rounded-lg" />
              <div className="h-11 bg-gray-100 rounded-lg" />
              <div className="h-11 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}