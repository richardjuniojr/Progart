import { db } from "../../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useState } from "react";
import Cookies from 'js-cookie';
import Button from "../ui/Button";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import { toast } from "react-toastify";

const SUBMISSION_LIMIT = 3; // Limit to 3 submissions
const TIME_LIMIT = 60 * 60 * 1000; // 1 hour in milliseconds

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true); // Set loading to true during submission

    // Ensure submissions is an array
    const submissions = JSON.parse(Cookies.get('submissions') || '[]');
    const now = new Date().getTime();

    // Filter submissions within the time limit
    const recentSubmissions = submissions.filter(submission => now - submission < TIME_LIMIT);

    // Check if the submission limit has been reached
    if (recentSubmissions.length >= SUBMISSION_LIMIT) {
      toast.error("You have reached the submission limit. Please try again later.");
      setError("You have reached the submission limit. Please try again later.");
      setLoading(false); // Reset loading state
      return;
    }

    try {
      // Add email to Firestore
      const emailsRef = collection(db, "contacts");
      await addDoc(emailsRef, {
        email,
        subject,
        message,
        isRead: false,
        timestamp: Timestamp.now(),
      });

      toast.success("Email sent successfully!");

      // Update the submissions cookie
      recentSubmissions.push(now);
      Cookies.set('submissions', JSON.stringify(recentSubmissions), { expires: 1 }); // Expires in 1 day

      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error("Error sending email: ", err);
      toast.error("An error occurred while sending your message. Please try again.");
      setError("An error occurred while sending your message. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };


  return (
    <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit}>
        <h1 className="card-title text-3xl">Contact us</h1>
        <p className="text-lg">Please write a message if you have any questions.</p>
        <div className="form-control">
          <label className="label">Email</label>
          <Input
            type="email"
            name="email"
            maxLength={40}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">Subject</label>
          <Input
            type="text"
            name="subject"
            maxLength={50}
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">Message</label>
          <TextArea
            name="message"
            placeholder="Write a message"
            maxLength={600}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="form-control mt-2">
          <Button text="Send" variant="primary" loading={loading} disabled={loading} />
          {error && <p className="text-error text-center mt-2">{error}</p>}
        </div>
      </form>
    </div>
  );
}
