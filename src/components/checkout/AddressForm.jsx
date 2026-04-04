"use client";
import { useState, useEffect } from "react";
import { addAddress, updateAddress } from "services/api/address";
import API from "services/api/api"; // axios instance
const userId =
  typeof window !== "undefined"
    ? Number(localStorage.getItem("authUserId"))
    : null;
export default function AddressForm({
  editId,
  setEditId,
  addresses,
  setAddresses,
  setSelectedAddressId,
  setShowForm,
}) {
  const [form, setForm] = useState({
    user_id: userId || "",
    name: "",
    email: "",
    phone_number: "",
    address: "",
    street: "",
    apartment_suite: "",
    country_id: "",
    state_id: "",
    city_id: "",
    zipcode: "",
    address_type: "",
    status: 1,
  });

  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // ✅ FETCH COUNTRIES
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await API.get("/countries");
        setCountries(res.data.data || []);
      } catch (err) {
        console.error("Country error:", err);
      }
    };
    fetchCountries();
  }, []);

  // ✅ FETCH STATES
  useEffect(() => {
    if (!form.country_id) return;
    const fetchStates = async () => {
      try {
        const res = await API.get(`/states/${form.country_id}`);
        setStates(res.data.data || []);
      } catch (err) {
        console.error("State error:", err);
      }
    };
    fetchStates();
  }, [form.country_id]);

  // ✅ FETCH CITIES
  useEffect(() => {
    if (!form.state_id) return;
    const fetchCities = async () => {
      try {
        const res = await API.get(`/cities/${form.state_id}`);
        setCities(res.data.data || []);
      } catch (err) {
        console.error("City error:", err);
      }
    };
    fetchCities();
  }, [form.state_id]);

  // ✅ EDIT PREFILL
  useEffect(() => {
    if (editId) {
      const addr = addresses.find((a) => a.id === editId);
      if (addr) {
        setForm({
          ...addr,
          country_id: addr.country_id?.id || addr.country_id,
          state_id: addr.state_id?.id || addr.state_id,
          city_id: addr.city_id?.id || addr.city_id,
        });
      }
    }
  }, [editId]);

  const update = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  // ✅ VALIDATION
  const validate = () => {
    let newErrors = {};

    Object.keys(form).forEach((key) => {
      if (!form[key]) {
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ SAVE
const saveAddress = async () => {
  if (!validate()) return;

  const payload = {
    ...form,
    user_id: userId, // 👈 force attach
  };

  try {
    if (editId) {
      const updated = await updateAddress(editId, payload);
      setAddresses(prev => prev.map(a => (a.id === editId ? updated : a)));
      setEditId(null);
    } else {
      const newAddr = await addAddress(payload);
      setAddresses(prev => [...prev, newAddr]);
      setSelectedAddressId(newAddr.id);
    }

    setShowForm(false);
  } catch (err) {
    console.error("Error saving address:", err);
  }
};

  return (
    <div className="mt-6 space-y-3 border-t pt-4">

      {/* NAME */}
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
        className="w-full border p-2"
      />
      {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

      {/* EMAIL */}
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        className="w-full border p-2"
      />
      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

      {/* PHONE */}
      <input
        placeholder="Phone"
        value={form.phone_number}
        onChange={(e) => update("phone_number", e.target.value)}
        className="w-full border p-2"
      />
      {errors.phone_number && <p className="text-red-500 text-xs">{errors.phone_number}</p>}

      {/* ADDRESS */}
      <input
        placeholder="Address"
        value={form.address}
        onChange={(e) => update("address", e.target.value)}
        className="w-full border p-2"
      />

      {/* STREET */}
      <input
        placeholder="Street"
        value={form.street}
        onChange={(e) => update("street", e.target.value)}
        className="w-full border p-2"
      />

      {/* APARTMENT */}
      <input
        placeholder="Apartment / Suite"
        value={form.apartment_suite}
        onChange={(e) => update("apartment_suite", e.target.value)}
        className="w-full border p-2"
      />

      {/* COUNTRY */}
      <select
        value={form.country_id}
        onChange={(e) => update("country_id", e.target.value)}
        className="w-full border p-2"
      >
        <option value="">Select Country</option>
        {countries.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      {errors.country_id && <p className="text-red-500 text-xs">{errors.country_id}</p>}

      {/* STATE */}
      <select
        value={form.state_id}
        onChange={(e) => update("state_id", e.target.value)}
        className="w-full border p-2"
      >
        <option value="">Select State</option>
        {states.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* CITY */}
      <select
        value={form.city_id}
        onChange={(e) => update("city_id", e.target.value)}
        className="w-full border p-2"
      >
        <option value="">Select City</option>
        {cities.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* ZIP */}
      <input
        placeholder="Zipcode"
        value={form.zipcode}
        onChange={(e) => update("zipcode", e.target.value)}
        className="w-full border p-2"
      />

      {/* ADDRESS TYPE */}
      <select
        value={form.address_type}
        onChange={(e) => update("address_type", e.target.value)}
        className="w-full border p-2"
      >
        <option value="">Select Type</option>
        <option value="home">Home</option>
        <option value="work">Work</option>
      </select>

      {/* BUTTON */}
      <button
        onClick={saveAddress}
        className="bg-black text-white px-4 py-2 text-xs w-full"
      >
        {editId ? "UPDATE ADDRESS" : "SAVE ADDRESS"}
      </button>
    </div>
  );
}