import { useState, useEffect, useRef } from "react";
import logo from '../../components/material/logo2.png';

const API_URL = import.meta.env.VITE_API_URL;
const API = `${API_URL}/api/doctors`;
const UPLOADS = `${API_URL}/`;

const initialForm = {
  name: "", specialty: "", email: "", phone: "",
  experience: "", bio: "", available: true, photo: null,
  consultation:"",location:'',availableDays:'',availableTime:'',
  qualification:'',regNumber:''
};

const SPECIALTIES = [
  "Cardiology", "Dermatology", "Neurology", "Orthopedics","gynecologist",
  "Pediatrics", "Psychiatry", "Radiology", "Surgery", "General Practice", "Other",
];

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // "add" | "edit" | "delete"
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const fileRef = useRef();

  useEffect(() => { fetchDoctors(); }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  async function fetchDoctors() {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      setDoctors(data);
    } catch {
      showToast("Failed to load doctors", "error");
    }
    setLoading(false);
  }

  function showToast(msg, type = "success") {
    setToast({ msg, type });
  }

  function openAdd() {
    setForm(initialForm);
    setPreview(null);
    setModal("add");
  }

  function openEdit(doc) {
    setSelected(doc);
    setForm({
      name: doc.name || "",
      specialty: doc.specialty || "",
      email: doc.email || "",
      phone: doc.phone || "",
      experience: doc.experience || "",
      bio: doc.bio || "",
      available: doc.available ?? true,
      photo: null,
      consultation:doc.consultation||'',
      location:doc.location||'',
      availableDays:doc.availableDays||'',
      availableTime:doc.availableTime||'',
      qualification:doc.qualification||'',
      regNumber:doc.regNumber||'',

      
    });
    setPreview(doc.photo ? UPLOADS + doc.photo : null);
    setModal("edit");
  }

  function openDelete(doc) {
    setSelected(doc);
    setModal("delete");
  }

  function closeModal() {
    setModal(null);
    setSelected(null);
    setForm(initialForm);
    setPreview(null);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setForm(f => ({ ...f, photo: file }));
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit() {
    if (!form.name || !form.specialty || !form.email) {
      showToast("Name, specialty and email are required", "error");
      return;
    }
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v !== null && v !== undefined) fd.append(k, v);
    });
    try {
      const url = modal === "edit" ? `${API}/${selected._id}` : API;
      const method = modal === "edit" ? "PUT" : "POST";
      const res = await fetch(url, { method, body: fd });
      if (!res.ok) throw new Error();
      showToast(modal === "edit" ? "Doctor updated!" : "Doctor added!");
      fetchDoctors();
      closeModal();
    }  catch (err) {
  console.error("Doctor save failed:", err);
  showToast("Something went wrong", "error");
    }
    setSaving(false);
  }

  async function handleDelete() {
    setSaving(true);
    try {
      await fetch(`${API}/${selected._id}`, { method: "DELETE" });
      showToast("Doctor removed");
      fetchDoctors();
      closeModal();
    } catch {
      showToast("Failed to delete", "error");
    }
    setSaving(false);
  }

  const filtered = doctors.filter(d =>
    d.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty?.toLowerCase().includes(search.toLowerCase())
  );

  const initials = (name) =>
    name?.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase() || "DR";

  const avatarColor = (name) => {
    const colors = ["#3B6D11", "#185FA5", "#854F0B", "#3C3489", "#0F6E56", "#993556"];
    let h = 0;
    for (let c of (name || "")) h = c.charCodeAt(0) + ((h << 5) - h);
    return colors[Math.abs(h) % colors.length];
  };

  return (
    <div style={s.page}>

      {/* Sidebar */}
      <aside className="px-18 py-40 bg-blue-600">
        <div className=" flex gap-3">
          <img className="w-12" src={logo} alt="" />  <div className="text-2xl pt-2 j-exb">DocNow</div>
        </div>
      </aside>

      {/* Main */}
      <main style={s.main}>

        {/* Header */}
        <header style={s.header}>
          <div>
            <h1 style={s.pageTitle}>Doctor Profiles</h1>
            <p style={s.pageSub}>{doctors.length} registered doctors</p>
          </div>
          <button style={s.addBtn} onClick={openAdd}>+ Add Doctor</button>
        </header>

        {/* Search */}
        <div style={s.searchWrap}>
          <input
            style={s.search}
            placeholder="Search by name or specialty..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Stats */}
        <div style={s.statsRow}>
          <div style={s.stat}>
            <span style={s.statNum}>{doctors.length}</span>
            <span style={s.statLabel}>Total Doctors</span>
          </div>
          <div style={s.stat}>
            <span style={s.statNum}>{doctors.filter(d => d.available).length}</span>
            <span style={s.statLabel}>Available</span>
          </div>
          <div style={s.stat}>
            <span style={s.statNum}>{doctors.filter(d => !d.available).length}</span>
            <span style={s.statLabel}>Unavailable</span>
          </div>
          <div style={s.stat}>
            <span style={s.statNum}>{[...new Set(doctors.map(d => d.specialty))].length}</span>
            <span style={s.statLabel}>Specialties</span>
          </div>
        </div>

        {/* Doctor Cards */}
        {loading ? (
          <div style={s.empty}>Loading doctors...</div>
        ) : filtered.length === 0 ? (
          <div style={s.empty}>
            {search ? "No doctors match your search." : "No doctors yet. Click + Add Doctor to get started."}
          </div>
        ) : (
          <div style={s.grid}>
            {filtered.map(doc => (
              <div key={doc._id} style={s.card}>
                <div style={s.cardTop}>
                  {doc.photo ? (
                    <img src={UPLOADS + doc.photo} alt={doc.name} style={s.avatar} />
                  ) : (
                    <div style={{ ...s.avatarInitials, background: avatarColor(doc.name) }}>
                      {initials(doc.name)}
                    </div>
                  )}
                  <div style={{
                    ...s.badge,
                    background: doc.available ? "#EAF3DE" : "#FCEBEB",
                    color: doc.available ? "#3B6D11" : "#A32D2D",
                  }}>
                    {doc.available ? "Available" : "Unavailable"}
                  </div>
                </div>
                <div style={s.cardBody}>
                  <h3 style={s.docName}>{doc.name}</h3>
                  <p style={s.docSpec}>{doc.specialty}</p>
                  {doc.experience && (
                    <p style={s.docMeta}>{doc.experience} yrs experience</p>
                  )}
                  {doc.email && (
                    <p style={s.docMeta}>{doc.email}</p>
                  )}
                  {doc.bio && (
                    <p style={s.docBio}>{doc.bio}</p>
                  )}
                </div>
                <div style={s.cardActions}>
                  <button style={s.editBtn} onClick={() => openEdit(doc)}>Edit</button>
                  <button style={s.deleteBtn} onClick={() => openDelete(doc)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add / Edit Modal */}
      {(modal === "add" || modal === "edit") && (
        <div style={s.overlay} onClick={closeModal}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <div style={s.modalHeader}>
              <h2 style={s.modalTitle}>{modal === "add" ? "Add New Doctor" : "Edit Doctor"}</h2>
              <button style={s.closeBtn} onClick={closeModal}>✕</button>
            </div>
            <div style={s.modalBody}>

              {/* Photo Upload */}
              <div style={s.photoUpload} onClick={() => fileRef.current.click()}>
                {preview ? (
                  <img src={preview} alt="preview" style={s.photoPreview} />
                ) : (
                  <div style={s.photoPlaceholder}>
                    <span style={{ fontSize: 28 }}>📷</span>
                    <span style={{ fontSize: 13, color: "#888", marginTop: 6 }}>Click to upload photo</span>
                  </div>
                )}
                <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
              </div>

              <div style={s.formGrid}>
                <div style={s.formGroup}>
                  <label style={s.label}>Full Name *</label>
                  <input style={s.input} name="name" value={form.name} onChange={handleChange} placeholder="Dr. John Smith" />
                </div>
                <div style={s.formGroup}>
                  <label style={s.label}>Specialty *</label>
                  <select style={s.input} name="specialty" value={form.specialty} onChange={handleChange}>
                    <option value="">Select specialty</option>
                    {SPECIALTIES.map(sp => <option key={sp} value={sp}>{sp}</option>)}
                  </select>
                </div>
                <div style={s.formGroup}>
                  <label style={s.label}>Email *</label>
                  <input style={s.input} name="email" value={form.email} onChange={handleChange} placeholder="doctor@hospital.com" />
                </div>
                <div style={s.formGroup}>
                  <label style={s.label}>Phone</label>
                  <input style={s.input} name="phone" value={form.phone} onChange={handleChange} placeholder="+880 1234 567890" />
                </div>
                <div style={s.formGroup}>
                  <label style={s.label}>Experience (years)</label>
                  <input style={s.input} type="number" name="experience" value={form.experience} onChange={handleChange} placeholder="5" />
                </div>
                <div style={s.formGroup}>
                  <label style={s.label}>Availability</label>
                  <label style={s.checkLabel}>
                    <input type="checkbox" name="available" checked={form.available} onChange={handleChange} />
                    <span style={{ marginLeft: 8 }}>Available for appointments</span>
                  </label>
                </div>
              </div>

              <div style={s.formGroup}>
  <label style={s.label}>Bio</label>
  <textarea style={{ ...s.input, height: 90, resize: "vertical" }} name="bio" value={form.bio} onChange={handleChange} placeholder="Brief description about the doctor..." />
</div>

{/* New Fields */}
<div style={s.formGrid}>
  <div style={s.formGroup}>
    <label style={s.label}>Consultation Fee (Taka)</label>
    <input style={s.input} name="consultation" value={form.consultation} onChange={handleChange} placeholder="500" type="number" />
  </div>
  <div style={s.formGroup}>
    <label style={s.label}>Qualification</label>
    <input style={s.input} name="qualification" value={form.qualification} onChange={handleChange} placeholder="MBBS, MD" />
  </div>
  <div style={s.formGroup}>
    <label style={s.label}>Registration Number</label>
    <input style={s.input} name="regNumber" value={form.regNumber} onChange={handleChange} placeholder="BD 12451254" />
  </div>
  <div style={s.formGroup}>
    <label style={s.label}>Available Time</label>
    <input style={s.input} name="availableTime" value={form.availableTime} onChange={handleChange} placeholder="10:00 AM - 5:00 PM" />
  </div>
</div>

<div style={s.formGroup}>
  <label style={s.label}>Location / Hospital</label>
  <input style={s.input} name="location" value={form.location} onChange={handleChange} placeholder="TMSS Medical College, Bogura" />
</div>

<div style={s.formGroup}>
  <label style={s.label}>Available Days</label>
  <input style={s.input} name="availableDays" value={form.availableDays} onChange={handleChange} placeholder="Sunday, Monday, Thursday" />
</div>
            </div>

            <div style={s.modalFooter}>
              <button style={s.cancelBtn} onClick={closeModal}>Cancel</button>
              <button style={s.saveBtn} onClick={handleSubmit} disabled={saving}>
                {saving ? "Saving..." : modal === "edit" ? "Save Changes" : "Add Doctor"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {modal === "delete" && (
        <div style={s.overlay} onClick={closeModal}>
          <div style={{ ...s.modal, maxWidth: 420 }} onClick={e => e.stopPropagation()}>
            <div style={s.modalHeader}>
              <h2 style={s.modalTitle}>Remove Doctor</h2>
              <button style={s.closeBtn} onClick={closeModal}>✕</button>
            </div>
            <div style={{ ...s.modalBody, textAlign: "center", padding: "2rem 1.5rem" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
              <p style={{ fontSize: 16, marginBottom: 8 }}>Are you sure you want to remove</p>
              <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{selected?.name}?</p>
              <p style={{ fontSize: 13, color: "#888" }}>This action cannot be undone.</p>
            </div>
            <div style={s.modalFooter}>
              <button style={s.cancelBtn} onClick={closeModal}>Cancel</button>
              <button style={{ ...s.saveBtn, background: "#E24B4A" }} onClick={handleDelete} disabled={saving}>
                {saving ? "Removing..." : "Yes, Remove"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          ...s.toast,
          background: toast.type === "error" ? "#E24B4A" : "#1D9E75",
        }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

const s = {
  page: { display: "flex", minHeight: "100vh", fontFamily: "system-ui, sans-serif", background: "#F8F8F6" },
  sidebar: { width: 220, background: "#0C1B2E", display: "flex", flexDirection: "column", padding: "1.5rem 1rem", flexShrink: 0 },
  logo: { display: "flex", alignItems: "center", gap: 10, marginBottom: "2.5rem", paddingLeft: 6 },
  logoIcon: { width: 32, height: 32, borderRadius: 8, background: "#1D9E75", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18 },
  logoText: { color: "#fff", fontWeight: 700, fontSize: 18, letterSpacing: "-0.3px" },
  nav: { flex: 1, display: "flex", flexDirection: "column", gap: 4 },
  navItem: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, color: "#8899AA", fontSize: 14, cursor: "pointer" },
  navActive: { background: "rgba(255,255,255,0.08)", color: "#fff" },
  navIcon: { fontSize: 16 },
  sidebarFooter: { marginTop: "auto", paddingTop: "1rem" },
  adminBadge: { background: "rgba(255,255,255,0.07)", color: "#8899AA", fontSize: 11, padding: "6px 10px", borderRadius: 6, textAlign: "center", letterSpacing: "0.5px" },
  main: { flex: 1, padding: "2rem 2.5rem", overflowY: "auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" },
  pageTitle: { fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: "-0.5px", color: "#111" },
  pageSub: { fontSize: 13, color: "#888", margin: "4px 0 0" },
  addBtn: { background: "#1D9E75", color: "#fff", border: "none", borderRadius: 10, padding: "10px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer" },
  searchWrap: { marginBottom: "1.5rem" },
  search: { width: "100%", padding: "10px 16px", borderRadius: 10, border: "1px solid #E0E0DC", fontSize: 14, background: "#fff", boxSizing: "border-box", outline: "none" },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: "2rem" },
  stat: { background: "#fff", borderRadius: 12, padding: "1.2rem 1.5rem", border: "1px solid #EBEBEB", display: "flex", flexDirection: "column", gap: 4 },
  statNum: { fontSize: 28, fontWeight: 700, color: "#111", lineHeight: 1 },
  statLabel: { fontSize: 12, color: "#888" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 20 },
  card: { background: "#fff", borderRadius: 16, border: "1px solid #EBEBEB", overflow: "hidden", display: "flex", flexDirection: "column" },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "1.2rem 1.2rem 0" },
  avatar: { width: 64, height: 64, borderRadius: 50, objectFit: "cover" },
  avatarInitials: { width: 64, height: 64, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 20, fontWeight: 700 },
  badge: { fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20, letterSpacing: "0.3px" },
  cardBody: { padding: "1rem 1.2rem", flex: 1 },
  docName: { fontSize: 17, fontWeight: 700, margin: "0 0 3px", color: "#111" },
  docSpec: { fontSize: 13, color: "#1D9E75", fontWeight: 600, margin: "0 0 8px" },
  docMeta: { fontSize: 12, color: "#888", margin: "2px 0" },
  docBio: { fontSize: 12, color: "#666", margin: "8px 0 0", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" },
  cardActions: { display: "flex", gap: 8, padding: "1rem 1.2rem", borderTop: "1px solid #F0F0EE" },
  editBtn: { flex: 1, padding: "8px", borderRadius: 8, border: "1px solid #E0E0DC", background: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#333" },
  deleteBtn: { flex: 1, padding: "8px", borderRadius: 8, border: "1px solid #FACECE", background: "#FFF5F5", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#E24B4A" },
  empty: { textAlign: "center", color: "#aaa", fontSize: 15, padding: "4rem 0" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "#fff", borderRadius: 20, width: "90%", maxWidth: 620, maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: "1px solid #F0F0EE" },
  modalTitle: { fontSize: 18, fontWeight: 700, margin: 0 },
  closeBtn: { background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#888", padding: 4 },
  modalBody: { padding: "1.5rem", overflowY: "auto", flex: 1 },
  modalFooter: { display: "flex", justifyContent: "flex-end", gap: 10, padding: "1rem 1.5rem", borderTop: "1px solid #F0F0EE" },
  photoUpload: { width: 100, height: 100, borderRadius: 50, border: "2px dashed #DDD", margin: "0 auto 1.5rem", cursor: "pointer", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" },
  photoPreview: { width: "100%", height: "100%", objectFit: "cover" },
  photoPlaceholder: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" },
  formGroup: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: "#555" },
  input: { padding: "9px 12px", borderRadius: 8, border: "1px solid #DDD", fontSize: 14, outline: "none", background: "#fff", fontFamily: "inherit" },
  checkLabel: { display: "flex", alignItems: "center", fontSize: 14, color: "#444", marginTop: 4 },
  cancelBtn: { padding: "9px 20px", borderRadius: 8, border: "1px solid #DDD", background: "#fff", fontSize: 14, cursor: "pointer", color: "#555" },
  saveBtn: { padding: "9px 24px", borderRadius: 8, border: "none", background: "#1D9E75", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" },
  toast: { position: "fixed", bottom: 28, right: 28, color: "#fff", padding: "12px 22px", borderRadius: 12, fontSize: 14, fontWeight: 600, zIndex: 9999 },
};