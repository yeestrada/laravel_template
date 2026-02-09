"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/baseComponents/label.tsx";
import { Pencil, X, Check } from "lucide-react";

interface UserDataCardProps {
  user: {
    name: string;
    phone: string;
    email: string;
    avatarUrl?: string;
  };
  usefNumber?: string;
  ushjaNumber?: string;
  feiNumber?: string;
  onSaveContact?: (contact: { phone: string; email: string }) => void;
  onSaveIds?: (ids: { usef: string; ushja: string; fei: string }) => void;
}

interface SectionHeaderProps {
  title: string;
  isEditing: boolean;
  onEditClick: () => void;
}

function SectionHeader({ title, isEditing, onEditClick }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xs font-semibold text-card-text-muted uppercase tracking-wide">
        {title}
      </h3>
      {!isEditing && (
        <button
          type="button"
          onClick={onEditClick}
          className="p-1.5 rounded-md text-card-text-muted hover:text-foreground hover:bg-black-100 transition-colors"
          aria-label={`Edit ${title.toLowerCase()}`}
        >
          <Pencil className="size-4" />
        </button>
      )}
    </div>
  );
}

interface FieldDisplayProps {
  label: string;
  value: string;
  placeholder?: string;
}

function FieldDisplay({ label, value, placeholder = "Not set" }: FieldDisplayProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-xs text-card-text-muted uppercase tracking-wide">
        {label}
      </Label>
      <p className={`text-sm ${value ? "text-foreground" : "text-card-text-muted italic"}`}>
        {value || placeholder}
      </p>
    </div>
  );
}

interface FieldInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

function FieldInput({ label, value, onChange, placeholder, type = "text" }: FieldInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs text-card-text-muted uppercase tracking-wide">
        {label}
      </Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 text-sm"
      />
    </div>
  );
}

interface EditActionsProps {
  onSave: () => void;
  onCancel: () => void;
}

function EditActions({ onSave, onCancel }: EditActionsProps) {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onCancel}
      >
        <X className="size-4 mr-1" />
        Cancel
      </Button>
      <Button
        type="button"
        variant="default"
        size="sm"
        onClick={onSave}
      >
        <Check className="size-4 mr-1" />
        Save
      </Button>
    </div>
  );
}

function UserDataCard({
  user,
  usefNumber = "",
  ushjaNumber = "",
  feiNumber = "",
  onSaveContact,
  onSaveIds,
}: UserDataCardProps) {
  // Contact section edit state
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [editPhone, setEditPhone] = useState(user.phone);
  const [editEmail, setEditEmail] = useState(user.email);

  // IDs section edit state
  const [isEditingIds, setIsEditingIds] = useState(false);
  const [editUsef, setEditUsef] = useState(usefNumber);
  const [editUshja, setEditUshja] = useState(ushjaNumber);
  const [editFei, setEditFei] = useState(feiNumber);

  // Contact handlers
  const handleEditContact = () => {
    setEditPhone(user.phone);
    setEditEmail(user.email);
    setIsEditingContact(true);
  };

  const handleSaveContact = () => {
    onSaveContact?.({ phone: editPhone, email: editEmail });
    setIsEditingContact(false);
  };

  const handleCancelContact = () => {
    setEditPhone(user.phone);
    setEditEmail(user.email);
    setIsEditingContact(false);
  };

  // IDs handlers
  const handleEditIds = () => {
    setEditUsef(usefNumber);
    setEditUshja(ushjaNumber);
    setEditFei(feiNumber);
    setIsEditingIds(true);
  };

  const handleSaveIds = () => {
    onSaveIds?.({ usef: editUsef, ushja: editUshja, fei: editFei });
    setIsEditingIds(false);
  };

  const handleCancelIds = () => {
    setEditUsef(usefNumber);
    setEditUshja(ushjaNumber);
    setEditFei(feiNumber);
    setIsEditingIds(false);
  };

  return (
    <div className="border border-horse-card-border bg-WEC-White w-full rounded-lg p-6 shadow-sm">
      {/* Header: Avatar and Name */}
      <div className="flex items-center gap-4 mb-5">
        <div className="flex flex-col items-center gap-2">
          <img
            className="rounded-full w-16 h-16 object-cover"
            src={user.avatarUrl || "https://placecats.com/300/200?fit=cover"}
            alt={`${user.name}'s avatar`}
          />
          <Badge shape="rounded" label="Valid" />
        </div>
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            <p className="text-lg font-medium">{user.name}</p>
            <Badge shape="square" label="Rider" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-horse-card-border my-5" />

      {/* Contact Info Section */}
      <div>
        <SectionHeader
          title="Contact Info"
          isEditing={isEditingContact}
          onEditClick={handleEditContact}
        />

        {isEditingContact ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldInput
                label="Phone"
                value={editPhone}
                onChange={setEditPhone}
                placeholder="Enter phone number"
                type="tel"
              />
              <FieldInput
                label="Email"
                value={editEmail}
                onChange={setEditEmail}
                placeholder="Enter email address"
                type="email"
              />
            </div>
            <EditActions onSave={handleSaveContact} onCancel={handleCancelContact} />
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldDisplay label="Phone" value={user.phone} placeholder="No phone" />
            <FieldDisplay label="Email" value={user.email} placeholder="No email" />
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-horse-card-border my-5" />

      {/* Organization IDs Section */}
      <div>
        <SectionHeader
          title="Organization IDs"
          isEditing={isEditingIds}
          onEditClick={handleEditIds}
        />

        {isEditingIds ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FieldInput
                label="USEF #"
                value={editUsef}
                onChange={setEditUsef}
                placeholder="Enter USEF number"
              />
              <FieldInput
                label="USHJA #"
                value={editUshja}
                onChange={setEditUshja}
                placeholder="Enter USHJA number"
              />
              <FieldInput
                label="FEI #"
                value={editFei}
                onChange={setEditFei}
                placeholder="Enter FEI number"
              />
            </div>
            <EditActions onSave={handleSaveIds} onCancel={handleCancelIds} />
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FieldDisplay label="USEF #" value={usefNumber} placeholder="Not set" />
            <FieldDisplay label="USHJA #" value={ushjaNumber} placeholder="Not set" />
            <FieldDisplay label="FEI #" value={feiNumber} placeholder="Not set" />
          </div>
        )}
      </div>
    </div>
  );
}

export { UserDataCard };
