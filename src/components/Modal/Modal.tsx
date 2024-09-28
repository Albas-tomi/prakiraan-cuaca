import React from "react";

type FormUsersProps = {
  children: React.ReactNode;
  width?: string;
  heigth?: string;
};

const Modal = (props: FormUsersProps) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto h-screen w-screen bg-black bg-opacity-50">
      <main
        className={`bg-white ${props.width} ${props.heigth} overflow-y-auto  no-scrollbar rounded-lg  p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      >
        {props.children}
      </main>
    </div>
  );
};

export default Modal;
