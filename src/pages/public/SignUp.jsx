import React from "react";

import SignUpUserForm from "../../components/users/SignUpUserForm";

function SignUp() {
  return (
    <div className="mt-5">
      <div className="flex flex-wrap lg:flex-wrap justify-center">
        {/* sign up section */}
        <div className="p-2">
          <div className="bg-white flex flex-col px-5 pb-5 pt-5">
            {/* title */}
            <div className="w-full px-10 flex flex-col justify-center">
              <p className="text-3xl font-bold mb-3">Crear cuenta</p>
            </div>

            {/* form section */}
            <SignUpUserForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
