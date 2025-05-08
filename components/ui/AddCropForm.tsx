'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';
import { Input } from './Input';
import { Label } from './Label';
import { Select } from './Select';

interface AddCropFormProps {
    onSubmit: (cropData: {
        name: string;
        type: string;
        plantingDate: string;
        area: number;
    }) => void;
}

export function AddCropForm({ onSubmit }: AddCropFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        type: 'maize', // default value
        plantingDate: '',
        area: 0,
    });

    const cropTypes = [
        'maize',
        'beans',
        'wheat',
        'rice',
        'potatoes',
        'tomatoes',
        'other'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        // Reset form
        setFormData({
            name: '',
            type: 'maize',
            plantingDate: '',
            area: 0,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
            <div>
                <Label htmlFor="cropName">Crop Name</Label>
                <Input
                    id="cropName"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter crop name"
                    required
                />
            </div>

            <div>
                <Label htmlFor="cropType">Crop Type</Label>
                <Select
                    id="cropType"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                    {cropTypes.map((type) => (
                        <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                    ))}
                </Select>
            </div>

            <div>
                <Label htmlFor="plantingDate">Planting Date</Label>
                <Input
                    id="plantingDate"
                    type="date"
                    value={formData.plantingDate}
                    onChange={(e) => setFormData({ ...formData, plantingDate: e.target.value })}
                    required
                />
            </div>

            <div>
                <Label htmlFor="area">Area (hectares)</Label>
                <Input
                    id="area"
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
                    required
                />
            </div>

            <Button type="submit" className="w-full">
                Add Crop
            </Button>
        </form>
    );
} 