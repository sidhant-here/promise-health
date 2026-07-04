export const clinicConfig = {
  name: "Promise Health",
  phone: "(555) 240-1878",
  address: "412 Alder Street, Suite 200\nNorthlake, OR 97210",
  email: "hello@promisehealth.com",
  year: new Date().getFullYear(),
  founder: {
    name: "Dr. Prashant Parihar",
    quote: "Every patient deserves a doctor who remembers them",
    subquote: "I'm Dr. Prashant Parihar. I started Promise Health in 2011 because I was tired of watching patients get treated like a number. Fifteen years on, our whole team still runs on that one idea — same-day care, real relationships, no rush.",
    stats: [
      { num: 14, suffix: "+", label: "Years in practice" },
      { num: 6200, suffix: "+", label: "Patients cared for" },
      { num: 4.9, suffix: "", decimals: 1, label: "Average rating" }
    ]
  },
  services: [
    { tag: "ANNUAL", time: "30 min", title: "Primary care", desc: "Ongoing care for adults — check-ups, prescriptions, referrals, and everything in between." },
    { tag: "AGES 0–17", time: "30 min", title: "Pediatrics", desc: "Well-child visits, vaccinations, and same-day care when your kid wakes up not feeling right." },
    { tag: "WELLNESS", time: "45 min", title: "Preventive screenings", desc: "Bloodwork, cancer screenings, and routine labs — scheduled to catch things early." },
    { tag: "ONGOING", time: "30 min", title: "Chronic care management", desc: "Diabetes, hypertension, and long-term conditions, tracked visit over visit by one doctor." },
    { tag: "WELLNESS", time: "45 min", title: "Women's health", desc: "Annual exams, reproductive health, and prenatal referrals in a private, unhurried setting." },
    { tag: "TODAY", time: "20 min", title: "Same-day urgent visits", desc: "Not an emergency, can't wait a week — sprains, fevers, infections, and the like." }
  ],
  team: [
    {
      name: "Dr. Prashant Parihar",
      specialty: "Family Medicine · Founder",
      next: "Today · 2:40 PM",
      color: "#D9A066",
      bg: "#DCEBE9",
      bio: "Board-certified in family medicine with 14+ years of clinical experience. Founded Promise Health to deliver relationship-driven primary care.",
      education: "MBBS, MD — Family Medicine",
      languages: ["English", "Hindi"],
      slots: [
        { day: "Today", times: ["2:40 PM", "4:00 PM"] },
        { day: "Tomorrow", times: ["9:00 AM", "10:30 AM", "1:15 PM", "3:00 PM"] },
        { day: "Wednesday", times: ["8:30 AM", "11:00 AM", "2:00 PM"] }
      ]
    },
    {
      name: "Dr. James Okafor",
      specialty: "Internal Medicine",
      next: "Tomorrow · 9:15 AM",
      color: "#8A5A34",
      bg: "#F4E6C8",
      bio: "Specialises in adult medicine, chronic disease management, and preventive care. Known for thorough, evidence-based treatment plans.",
      education: "MD — Internal Medicine",
      languages: ["English"],
      slots: [
        { day: "Tomorrow", times: ["9:15 AM", "11:00 AM", "2:30 PM"] },
        { day: "Thursday", times: ["8:00 AM", "10:00 AM", "1:00 PM", "3:45 PM"] },
        { day: "Friday", times: ["9:00 AM", "11:30 AM"] }
      ]
    },
    {
      name: "Dr. Priya Nair",
      specialty: "Pediatrics",
      next: "Today · 4:00 PM",
      color: "#E3B589",
      bg: "#E3ECE6",
      bio: "Paediatric specialist focused on newborn through adolescent care. Passionate about developmental milestones and childhood immunisations.",
      education: "MD — Pediatrics",
      languages: ["English", "Hindi", "Tamil"],
      slots: [
        { day: "Today", times: ["4:00 PM", "5:15 PM"] },
        { day: "Tomorrow", times: ["9:30 AM", "11:00 AM", "2:00 PM", "4:00 PM"] },
        { day: "Thursday", times: ["8:30 AM", "10:30 AM", "1:30 PM"] }
      ]
    },
    {
      name: "Dr. Ben Whitfield",
      specialty: "Preventive & Wellness",
      next: "Monday · 8:30 AM",
      color: "#F0C8A0",
      bg: "#E7EAEA",
      bio: "Focuses on preventive screenings, lifestyle medicine, and long-term wellness planning. Believes in catching problems before they start.",
      education: "DO — Preventive Medicine",
      languages: ["English", "Spanish"],
      slots: [
        { day: "Monday", times: ["8:30 AM", "10:00 AM", "1:00 PM", "3:30 PM"] },
        { day: "Tuesday", times: ["9:00 AM", "11:30 AM", "2:00 PM"] },
        { day: "Wednesday", times: ["8:00 AM", "10:30 AM"] }
      ]
    }
  ],
  steps: [
    { title: "Book your visit", desc: "Choose a doctor, a reason for the visit, and a time — online in under two minutes, or by phone." },
    { title: "Check in", desc: "Arrive 10 minutes early, or check in from your phone before you get here to skip the front desk." },
    { title: "See your doctor", desc: "Unhurried visits — your doctor has your full history pulled up before you sit down." },
    { title: "Get your plan", desc: "Notes, prescriptions, and next steps land in your patient portal before you're back in the car." }
  ],
  testimonials: [
    { quote: "I called about a fever at 8am and had a same-day slot by 8:04. Didn't sit in a waiting room once.", author: "M.T. — patient since 2019" },
    { quote: "My doctor actually remembered what we talked about last visit. That alone changed how I feel about going in.", author: "R.K. — patient since 2022" },
    { quote: "Booked my daughter's check-up on my phone during her nap. Portal notes were up before we left the parking lot.", author: "S.D. — new patient" }
  ],
  hours: [
    { day: "Saturday", time: "9:00 AM – 1:00 PM", active: true },
    { day: "Sunday", time: "Closed", active: false },
    { day: "Monday", time: "8:00 AM – 6:00 PM", active: false },
    { day: "Tuesday", time: "8:00 AM – 6:00 PM", active: false },
    { day: "Wednesday", time: "8:00 AM – 6:00 PM", active: false },
    { day: "Thursday", time: "8:00 AM – 6:00 PM", active: false },
    { day: "Friday", time: "8:00 AM – 6:00 PM", active: false }
  ]
};
