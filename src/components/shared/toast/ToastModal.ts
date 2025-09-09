import Swal from "sweetalert2";

export const showSuccessModal = (title?: string, descrip?: string) => {
  Swal.fire({
    html: `
      <div class="my-custom-modal flex flex-col items-center justify-start gap-4 px-8 py-3">
        <img class="w-10 h-10" src="https://cdn-icons-png.flaticon.com/512/148/148767.png" alt="img" />
        ${
          title
            ? `<p class="custom-text text-[20px] font-semibold">${title}</p>`
            : ""
        }
        ${descrip ? `<p>${descrip}</p>` : ""}
      </div>
    `,
    showConfirmButton: false,
    customClass: {
      popup: "w-fit px-14",
    },
    timer: 2000,
    timerProgressBar: false,
  });
};

export const showErrorModal = (descrip?: string) => {
  Swal.fire({
    html: `
      <div class="my-custom-modal flex flex-col items-center justify-start gap-4 px-0 py-3">
        <img class="w-10 h-10" src="https://static.vecteezy.com/system/resources/previews/026/526/158/non_2x/error-icon-vector.jpg" alt="img" />
  
        ${descrip ? `<p>${descrip}</p>` : ""}
      </div>
    `,
    showConfirmButton: false,
    customClass: {
      popup: "w-fit px-5",
    },
    timer: 2000,
    timerProgressBar: false,
  });
};

export const showSuccessAlert = (descrip?: string) => {
  Swal.fire({
    html: `
    <div class="my-custom-modal flex items-center justify-start gap-2 px-6 py-1 text-[14px] text-green-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="green" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      ${descrip ? `<p>${descrip}</p>` : ""}
    </div>
  `,
    showConfirmButton: false,
    customClass: {
      popup: "w-fit px-5",
      htmlContainer: "custom-swal",
    },
    timer: 2000,
    timerProgressBar: false,
  });
};

export const showErrorAlert = (descrip?: string) => {
  Swal.fire({
    html: `
    <div class="my-custom-modal flex items-center justify-start gap-2 px-6 py-1 text-[14px] text-[#f27020]">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f27020" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
</svg>
      ${descrip ? `<p>${descrip}</p>` : ""}
    </div>
  `,
    showConfirmButton: false,
    customClass: {
      popup: "w-fit px-5",
      htmlContainer: "custom-swal",
    },
    timer: 2000,
    timerProgressBar: false,
  });
};

// <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#349e09" class="size-6">
//   <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
// </svg>
