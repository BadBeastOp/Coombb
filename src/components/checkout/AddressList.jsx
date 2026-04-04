"use client";
import { deleteAddress } from "services/api/address";

export default function AddressList({
  addresses,
  selectedAddressId,
  setSelectedAddressId,
  setSelectedAddress,
  setShowForm,
  setEditId,
  setAddresses,
}) {

  const handleEdit = (addr) => {
    setEditId(addr.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteAddress(id);
      console.log("Delete response:", response);

      const filtered = addresses.filter((a) => a.id !== id);
      setAddresses(filtered);

      // ✅ HANDLE SELECTED AFTER DELETE
      if (selectedAddressId === id) {
        if (filtered.length > 0) {
          setSelectedAddressId(filtered[0].id);
          setSelectedAddress(filtered[0]);
        } else {
          setSelectedAddressId(null);
          setSelectedAddress(null);
        }
      }

    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };

  return (
    <div>
      <h2 className="mb-6 text-xs">SELECT ADDRESS</h2>

      <div className="space-y-4">
        {addresses.map((addr) => (
          <div key={addr.id} className="border p-4">
            <div className="flex justify-between">

              <label className="flex gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={selectedAddressId === addr.id}
                  onChange={() => {
                    setSelectedAddressId(addr.id);
                    setSelectedAddress(addr); // ✅ FIX
                  }}
                />

                <div>
                  <p>{addr.name}</p>
                  <p className="text-xs">
                    {addr.email}, {addr.phone_number}
                  </p>

                  <p className="text-xs">
                    {addr?.apartment_suite}, {addr?.street}
                  </p>

                  <p className="text-xs">{addr.zipcode}</p>

                  <p className="text-xs">
                    {addr.state?.name || addr.state},{" "}
                    {addr.city?.name || addr.city},{" "}
                    {addr.country?.name || addr.country}
                  </p>

                  {addr.isDefault && (
                    <span className="text-green-600 text-xs">
                      DEFAULT
                    </span>
                  )}
                </div>
              </label>

              <div className="flex gap-2 text-xs">
                <button onClick={() => handleEdit(addr)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(addr.id)}>
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="mt-6 underline text-xs"
      >
        + Add Address
      </button>
    </div>
  );
}