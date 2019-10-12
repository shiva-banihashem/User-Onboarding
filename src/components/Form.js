import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const FormUser = ({ values, errors, touched, status }) => {
        const [users, setUsers] = useState([]);
        useEffect(() => {
          if (status) {
            setUsers([...users, status]);
          }
        }, [status]);
      
        return (
          <div className="user-form">
            <Form>
              <Field type="text" name="usernames" placeholder="Username" />
              {touched.usernames && errors.usernames && (
                <p className="error">{errors.usernames}</p>
              )}
            <Field type="email" name="email" placeholder="Email" />
              {touched.email && errors.email && (
                <p className="error">{errors.email}</p>
              )}
              <Field type="password" name="password" placeholder="Password" />
              {touched.password && errors.password && (
              <p className="error">{errors.password}</p>)}
              <Field component="select" className="role-select" name="role">
          <option>Please Choose an Option</option>
          <option value="Salesperson">Salesperson</option>
          <option value="Manager">Manager</option>
          <option value="Developer">Developer</option>/></Field>
        <label className="checkbox-container">
          <Field className=""
            type="checkbox"
            name="termsOfService"
            checked={values.termsOfService}
          />
          terms Of Service:
          <span className="checkmark" />
        </label>
              <button>Submit!</button>
            </Form>
            {users.map(user => (
                
              <ul key={user.id}>
                  {console.log(user)}
                <li>User:{user.usernames}</li>
                <li>Email: {user.email}</li>
                <li>Password: {user.password}</li>
                <li>Terms Of Serive: {user.termsOfSerivce}</li>
              </ul>
            ))}
          </div>
        );
      };
      const FormikUserForm = withFormik({
        mapPropsToValues({ usernames, email, password,role,termsOfService }) {
          return {
            usernames: usernames || "",
            email: email || "",
            password: password || "",
            role: role || "",
            termsOfService: termsOfService || true
            
          };
        },
        validationSchema: Yup.object().shape({
          usernames: Yup.string().required("Username is required!"),
          email: Yup.string().required("Email is required!!!"),
          password:Yup.string().required("passwrod is required!!!"),
          termsOfService:Yup.bool("terms of service is required!")
        }),
        
         
        //You can use this to see the values
        handleSubmit(values, { setStatus }) {
          axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                console.log(res);

              setStatus(res.data);
            })
            .catch(err => console.log(err.res));
        }
      })(FormUser);
      
    
      console.log("This is the HOC", FormikUserForm);
      export default FormikUserForm;

