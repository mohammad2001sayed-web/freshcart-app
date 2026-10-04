"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  MapPin,
  Plus,
  Trash2,
  Pencil,
  X,
  Loader2,
  Phone,
  Building2,
} from "lucide-react";
import { AddressDataType, AddressType } from "./profile.interface";
import {
  handleAddAddress,
  handleGetAddresses,
  handleRemoveAddress,
  handleUpdateAddress,
} from "./address.actions";

const initialForm: AddressDataType = {
  name: "",
  details: "",
  phone: "",
  city: "",
};

export default function ProfilePage() {
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  // null = وضع الإضافة | غير null = وضع التعديل، وبنخزن فيه العنوان اللي بنعدله
  const [editingAddress, setEditingAddress] = useState<AddressType | null>(
    null,
  );

  const [isPending, startTransition] = useTransition();

  // 🔹 react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressDataType>({
    defaultValues: initialForm,
  });

  // 🔹 Fetch addresses on mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  async function fetchAddresses() {
    setLoading(true);
    try {
      const res = await handleGetAddresses();
      setAddresses(res?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function resetAndCloseModal() {
    reset(initialForm);
    setApiError(null);
    setEditingAddress(null);
    setIsModalOpen(false);
  }

  function openAddModal() {
    setEditingAddress(null);
    setApiError(null);
    reset(initialForm);
    setIsModalOpen(true);
  }

  function openEditModal(address: AddressType) {
    setEditingAddress(address);
    setApiError(null);
    reset({
      name: address.name,
      details: address.details,
      phone: address.phone,
      city: address.city,
    });
    setIsModalOpen(true);
  }

  function onSubmit(data: AddressDataType) {
    setApiError(null);

    startTransition(async () => {
      const res = editingAddress
        ? await handleUpdateAddress(editingAddress._id, data)
        : await handleAddAddress(data);

      if (res?.status === "success" || res?.data) {
        await fetchAddresses();
        resetAndCloseModal();
      } else {
        setApiError(res?.message || "حصل خطأ، حاول تاني");
      }
    });
  }

  function handleDelete(addressId: string) {
    setDeletingId(addressId);
    startTransition(async () => {
      const res = await handleRemoveAddress(addressId);
      if (res?.status === "success") {
        setAddresses((prev) => prev.filter((a) => a._id !== addressId));
      }
      setDeletingId(null);
    });
  }

  return (
    <div className="space-y-6">
      {/* Top Header inside page */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900">My Addresses</h2>
          <p className="text-xs md:text-sm text-gray-500 mt-0.5">
            Manage your saved delivery addresses
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-[#00a651] text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Address
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-2xl p-12 flex items-center justify-center shadow-sm border border-gray-100">
          <Loader2 className="w-6 h-6 text-[#00a651] animate-spin" />
        </div>
      )}

      {/* Empty State */}
      {!loading && addresses.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#00a651] flex items-center justify-center">
            <MapPin className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-900">No Addresses Yet</h3>
            <p className="text-xs md:text-sm text-gray-500 max-w-sm">
              Add your first delivery address to make checkout faster and easier.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-[#00a651] text-white text-xs md:text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Your First Address
          </button>
        </div>
      )}

      {/* Addresses List */}
      {!loading && addresses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-start justify-between gap-3"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 shrink-0 rounded-full bg-emerald-50 text-[#00a651] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-900">
                    {address.name}
                  </h4>
                  <p className="text-xs text-gray-500">{address.details}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Building2 className="w-3.5 h-3.5" />
                    {address.city}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Phone className="w-3.5 h-3.5" />
                    {address.phone}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => openEditModal(address)}
                  className="p-2 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                >
                  <Pencil className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(address._id)}
                  disabled={isPending && deletingId === address._id}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isPending && deletingId === address._id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Add / Edit Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-lg relative">
            <button
              onClick={resetAndCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {editingAddress ? "Edit Address" : "Add New Address"}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Home / Work..."
                  className={`w-full px-3 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.name ? "border-red-400" : "border-gray-200"
                  }`}
                  {...register("name", { required: "اكتب اسم للعنوان" })}
                />
                {errors.name && (
                  <p className="text-[11px] text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">
                  Details
                </label>
                <input
                  type="text"
                  placeholder="Street, building, apartment..."
                  className={`w-full px-3 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.details ? "border-red-400" : "border-gray-200"
                  }`}
                  {...register("details", {
                    required: "اكتب تفاصيل العنوان",
                  })}
                />
                {errors.details && (
                  <p className="text-[11px] text-red-500 mt-1">
                    {errors.details.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">
                  City
                </label>
                <input
                  type="text"
                  placeholder="Cairo"
                  className={`w-full px-3 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.city ? "border-red-400" : "border-gray-200"
                  }`}
                  {...register("city", { required: "اكتب اسم المدينة" })}
                />
                {errors.city && (
                  <p className="text-[11px] text-red-500 mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="01xxxxxxxxx"
                  className={`w-full px-3 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.phone ? "border-red-400" : "border-gray-200"
                  }`}
                  {...register("phone", {
                    required: "اكتب رقم تليفون",
                    pattern: {
                      value: /^01[0125][0-9]{8}$/,
                      message: "رقم التليفون غير صحيح (01xxxxxxxxx)",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-[11px] text-red-500 mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {apiError && (
                <p className="text-xs text-red-500 font-medium">{apiError}</p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#00a651] text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : editingAddress ? (
                  <Pencil className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                {editingAddress ? "Update Address" : "Save Address"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}