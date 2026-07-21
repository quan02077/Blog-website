import Swal from 'sweetalert2';

export const showSuccessAlert = (title, text) => {
    return Swal.fire({
        title,
        text,
        icon: 'success',
        confirmButtonText: 'OK'
    });
};

export const showErrorAlert = (title, text) => {
    return Swal.fire({
        title,
        text,
        icon: 'error',
        confirmButtonText: 'OK'
    });
};

export const showConfirmAlert = (title, text) => {
    return Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Chắc chắn rồi!',
        cancelButtonText: 'Hủy'
    });
};