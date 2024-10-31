import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
const FormInput = (props) => {
  let { editIndex, setEditIndex } = props;
  const formik = useFormik({
    initialValues: {
      maSV: "",
      name: "",
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      maSV: Yup.string()
        .required("Mã sinh viên bắt buộc phải nhập")
        .matches(/^\d{1,6}$/, "Mã sinh viên chưa đúng định dạng"),
      name: Yup.string()
        .required("Họ & tên bắt buộc phải nhập")
        .matches(
          /^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ\s]{2,50}$/,
          " Họ & tên chưa đúng định dạng"
        ),
      phone: Yup.string()
        .required("Số điện thoại bắt buộc phải nhập")
        .matches(
          /^\d{10,13}$/,
          "Số điện thoại chưa đúng định dạng (phải là số từ 10-13 số)"
        ),
      email: Yup.string()
        .required("Email không được để trống")
        .email("Email chưa đúng định dạng"),
    }),

    onSubmit: (values) => {
      if (editIndex !== null) {
        // Nếu có giá trị trong editIndex, cập nhật đối tượng hiện có
        const updatedData = [...arrData];
        updatedData[editIndex] = values;
        setArrData(updatedData);
        localStorage.setItem("dataSV", JSON.stringify(updatedData));
        setEditIndex(null); // Reset editIndex sau khi lưu xong
      } else {
        // Nếu không có giá trị trong editIndex, thêm đối tượng mới
        const newData = [...arrData, values];
        setArrData(newData);
        localStorage.setItem("dataSV", JSON.stringify(newData));
      }
      formik.resetForm();
    },
  });
  return (
    <form className="home_form-input" onSubmit={formik.handleSubmit}>
      <div className="mb-3 home_input ">
        <label htmlFor="maSV" className="form-label">
          Mã sinh viên
        </label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.maSV}
          type="text"
          className=" form-control"
          name="maSV"
          id="maSV"
        />
        {formik.errors.maSV ? (
          <p className="text-danger">{formik.errors.maSV}</p>
        ) : null}
      </div>
      <div className="mb-3 home_input ">
        <label htmlFor="name" className="form-label">
          Họ & Tên
        </label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          type="text"
          className="form-control"
          name="name"
          id="name"
        />
        {formik.errors.name ? (
          <p className="text-danger">{formik.errors.name}</p>
        ) : null}
      </div>
      <div className="mb-3 home_input ">
        <label htmlFor="phone" className="form-label">
          Số điện thoại
        </label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          type="text"
          className=" form-control"
          name="phone"
          id="phone"
        />
        {formik.errors.phone ? (
          <p className="text-danger">{formik.errors.phone}</p>
        ) : null}
      </div>
      <div className="mb-3 home_input ">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          type="text"
          className="  form-control"
          name="email"
          id="email"
        />
        {formik.errors.email ? (
          <p className="text-danger">{formik.errors.email}</p>
        ) : null}
      </div>
      <button type="submit" className="btn btn-primary">
        {editIndex !== null ? "Lưu thay đổi" : "Thêm sinh viên"}
      </button>
    </form>
  );
};

export default FormInput;
