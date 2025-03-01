import mongoose from 'mongoose';

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!mongoose.connections[0].readyState) {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

// API Route
export default async function(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, message } = req.body;
      const newContact = new Contact({ name, email, message });
      await newContact.save();
      res.status(201).json({ success: true, message: 'Message saved successfully!' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  } else {
    res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
}