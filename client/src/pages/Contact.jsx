import { useState } from "react";
import "./Contact.css";

export default function Contact() {
  // FORM STATE
  const [form, setForm] = useState({ name: "", email: "", comment: "" }); // Stores user input values
  const [errors, setErrors] = useState({}); // Storees validation messages
  const [success, setSuccess] = useState(""); // Stores a success message after submit

  // VALIDATION
  function validate(values) {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required";
    if (!values.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = "Email is invalid";
    if (!values.comment.trim()) e.comment = "Comment is required";
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    setSuccess("");

    const e = validate(form);
    setErrors(e);

    if (Object.keys(e).length === 0) {
      setSuccess("Thanks! Your message was sent.");
      setForm({ name: "", email: "", comment: "" });
    }
  }

  return (
    <div className="contactPage">
      <section className="contactShell">
        <div className="contactHeader">
          <h1>GET IN TOUCH</h1>
          <p>Questions? Send a note and we’ll get back to you.</p>
        </div>

        <form className="contactCard" onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={form.name}
              onChange={(ev) => setForm({ ...form, name: ev.target.value })}
              placeholder="Your name"
              className={errors.name ? "hasError" : ""}
            />
            {errors.name && <p className="errorText">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={form.email}
              onChange={(ev) => setForm({ ...form, email: ev.target.value })}
              placeholder="you@email.com"
              className={errors.email ? "hasError" : ""}
            />
            {errors.email && <p className="errorText">{errors.email}</p>}
          </div>

          {/* Comment */}
          <div className="field">
            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              value={form.comment}
              onChange={(ev) => setForm({ ...form, comment: ev.target.value })}
              rows={5}
              placeholder="What can we help with?"
              className={errors.comment ? "hasError" : ""}
            />
            {errors.comment && <p className="errorText">{errors.comment}</p>}
          </div>

          <button className="sendBtn" type="submit">
            SEND
          </button>

          {success && <p className="successText">{success}</p>}
        </form>
      </section>
          <img
            className="logoco"
            src="./images/logofor.PNG"
            alt="Brand logo"
          />
    </div>
  );
}
