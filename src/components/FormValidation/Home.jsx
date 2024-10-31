import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Home = () => {
  let [arrData, setArrData] = useState([]);
  let [keyword, setKeyword] = useState("");
  const [editIndex, setEditIndex] = useState(null);
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

  let renderTable = () => {
    // Lọc dữ liệu nếu có từ khóa
    let productSearch = keyword
      ? arrData.filter((product) =>
          product.name.toLowerCase().includes(keyword.toLowerCase())
        )
      : arrData;
    if (!productSearch || productSearch.length == 0) {
      return (
        <tr>
          <td colSpan="5">Không tìm thấy kết quả phù hợp</td>
        </tr>
      );
    }
    return productSearch.map((arr, index) => (
      <tr key={index} scope="row">
        <td>{arr.maSV}</td>
        <td>{arr.name}</td>
        <td>{arr.phone}</td>
        <td>{arr.email}</td>
        <td>
          <div>
            <button
              className="btn btn-outline-primary mx-2"
              onClick={() => {
                handleEdit(index);
              }}
            >
              Chỉnh sửa
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                handleDelete(index);
              }}
            >
              Xoá
            </button>
          </div>
        </td>
      </tr>
    ));
  };
  useEffect(() => {
    const arrDataLocal = JSON.parse(localStorage.getItem("dataSV"));
    setArrData(arrDataLocal);
  }, []);

  let handleDelete = (index) => {
    const newData = arrData.filter((_, i) => i !== index);
    setArrData(newData);
    localStorage.setItem("dataSV", JSON.stringify(newData));
  };
  let handleEdit = (index) => {
    const objEdit = arrData[index];
    formik.setValues(objEdit);
    setEditIndex(index);
  };

  return (
    <div className="container home">
      <h1 className="home_title">Thông tin sinh viên</h1>
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
      <div className="form_search my-3">
        <input
          onInput={(e) => {
            setKeyword(e.target.value);
          }}
          // onChange={handleInput}
          type="text"
          className="form-control w-50"
          placeholder="Enter keyword"
        />
        <button
          className="btn btn-success mt-2"
          id="search"
          onClick={() => {
            renderTable();
          }}
        >
          Search
        </button>
      </div>
      <div className="home_table">
        <table>
          <thead>
            <tr>
              <th>Mã SV</th>
              <th>Họ & Tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
