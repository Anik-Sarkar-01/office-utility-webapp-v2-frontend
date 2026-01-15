import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { message } from "antd";
import axios from "axios";
import userContext from "../../context/userContext";

const FormGroup = (value) => {
  return (
    <Form.Group className="mb-3" controlId={value.id}>
      {value.id === "superuser" ? (
        <Form.Check
          type={value.type}
          label="Admin rights?"
          {...value.register(value.id)}
        />
      ) : (
        <>
          <Form.Label className="fw-bold">{value.label}</Form.Label>
          <Form.Control
            type={value.type}
            placeholder={value.placeholder}
            {...value.register(value.id, {
              required: {
                value: value.required,
                message: "This field is required",
              },
              pattern: {
                value: value.pattern,
                message: value.message,
              },
            })}
          />
        </>
      )}
      {value.errors?.message && (
        <Form.Text className="text-danger">{value.errors?.message}</Form.Text>
      )}
    </Form.Group>
  );
};

const NewUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const authUser = useContext(userContext)

  const onSubmit = async (data) => {
    try {
      const formData = {
        name: data.name,
        employeeId: data.employeeId,   
        department: data.department,  
        email: data.email,
        password: data.password,
        joiningDate: data.joinDate,
        position: data.position,
        isSuperUser: data.superuser,
        address: data.address,
        phone: data.tel,
      };

      const response = await axios.post(
        "http://localhost:5000/api/superuser/signup",
        formData,
        {
          headers: {
            Authorization: "Bearer " + authUser.token,
          },
        }
      );

      message.success(response.data.message);
    } catch (error) {
      message.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };


  return (
    <div className="mt-4">
      <h2 className="text-center profile-detail-heading">Add new employee</h2>
      <div className="d-flex justify-content-center my-4">
        <Form onSubmit={handleSubmit(onSubmit)} className="px-5 py-4">
          <div className="row">
            <div className="col-6">
              <FormGroup
                register={register}
                errors={errors.name}
                type="text"
                placeholder="enter your name"
                label="Full Name"
                id="name"
                required={true}
                pattern=""
              />
              <FormGroup
                register={register}
                errors={errors.employeeId}
                type="text"
                placeholder="EMP-00123"
                label="Employee ID"
                id="employeeId"
                required={true}
                pattern={/^[A-Za-z0-9-_]+$/}
                message="Employee ID can contain letters, numbers, - or _"
              />
              <FormGroup
                register={register}
                errors={errors.department}
                type="text"
                placeholder="Engineering / HR / Sales"
                label="Department"
                id="department"
                required={true}
              />
              <FormGroup
                register={register}
                errors={errors.email}
                type="email"
                placeholder="abc@gmail.com"
                label="Email Address"
                id="email"
                required={true}
                pattern={/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/}
                message="please enter valid email"
              />
              <FormGroup
                register={register}
                errors={errors.password}
                type="password"
                placeholder="password"
                label="Password"
                id="password"
                required={true}
                pattern={/^([a-zA-Z0-9@*#$%^&*!]{6,15})$/}
                message="password should contain atleast 8 characters"
              />
              <FormGroup
                register={register}
                errors={errors.joinDate}
                type="date"
                placeholder="Joining Date"
                label="Joining Date"
                id="joinDate"
                required={true}
              />
              <FormGroup
                register={register}
                errors={errors.position}
                type="text"
                placeholder="Position"
                label="Position"
                id="position"
                required={true}
              />
              <FormGroup
                register={register}
                errors={errors.dateOfBirth}
                type="date"
                placeholder=""
                label="Date Of Birth"
                id="dateOfBirth"
                required={true}
                pattern={/^\d{4}-\d{2}-\d{2}$/}
                message="please enter valid date"
              />
              <FormGroup
                register={register}
                errors={errors.superuser}
                type="checkbox"
                id="superuser"
                required={false}
              />
            </div>
            <div className="col-6">
              <FormGroup
                register={register}
                errors={errors.address}
                type="text"
                placeholder="City, State"
                label="Address"
                id="address"
                required={true}
              />
              <FormGroup
                register={register}
                errors={errors.tel}
                type="tel"
                placeholder=""
                label="Phone Number"
                id="tel"
                required={true}
                pattern={/^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/}
                message="please enter valid phone number"
              />
            </div>
          </div>
          <Button variant="" type="submit" className="custom-button w-100 p-2">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default NewUser;
