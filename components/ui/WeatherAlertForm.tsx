'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';
import { Input } from './Input';
import { Label } from './Label';
import { Select } from './Select';
import { Switch } from './Switch';

interface WeatherAlertFormProps {
    onSubmit: (alertData: {
        temperature: {
            enabled: boolean;
            min: number;
            max: number;
        };
        rainfall: {
            enabled: boolean;
            threshold: number;
        };
        humidity: {
            enabled: boolean;
            min: number;
            max: number;
        };
        notificationMethod: string;
    }) => void;
}

export function WeatherAlertForm({ onSubmit }: WeatherAlertFormProps) {
    const [formData, setFormData] = useState({
        temperature: {
            enabled: false,
            min: 15,
            max: 35,
        },
        rainfall: {
            enabled: false,
            threshold: 5,
        },
        humidity: {
            enabled: false,
            min: 30,
            max: 80,
        },
        notificationMethod: 'email',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-4 bg-white rounded-lg shadow">
            {/* Temperature Alerts */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="tempEnabled">Temperature Alerts</Label>
                    <Switch
                        id="tempEnabled"
                        checked={formData.temperature.enabled}
                        onCheckedChange={(checked) =>
                            setFormData({
                                ...formData,
                                temperature: { ...formData.temperature, enabled: checked },
                            })
                        }
                    />
                </div>

                {formData.temperature.enabled && (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="tempMin">Minimum (°C)</Label>
                            <Input
                                id="tempMin"
                                type="number"
                                value={formData.temperature.min}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        temperature: {
                                            ...formData.temperature,
                                            min: Number(e.target.value),
                                        },
                                    })
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="tempMax">Maximum (°C)</Label>
                            <Input
                                id="tempMax"
                                type="number"
                                value={formData.temperature.max}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        temperature: {
                                            ...formData.temperature,
                                            max: Number(e.target.value),
                                        },
                                    })
                                }
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Rainfall Alerts */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="rainEnabled">Rainfall Alerts</Label>
                    <Switch
                        id="rainEnabled"
                        checked={formData.rainfall.enabled}
                        onCheckedChange={(checked) =>
                            setFormData({
                                ...formData,
                                rainfall: { ...formData.rainfall, enabled: checked },
                            })
                        }
                    />
                </div>

                {formData.rainfall.enabled && (
                    <div>
                        <Label htmlFor="rainThreshold">Rainfall Threshold (mm)</Label>
                        <Input
                            id="rainThreshold"
                            type="number"
                            value={formData.rainfall.threshold}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    rainfall: {
                                        ...formData.rainfall,
                                        threshold: Number(e.target.value),
                                    },
                                })
                            }
                        />
                    </div>
                )}
            </div>

            {/* Humidity Alerts */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="humidityEnabled">Humidity Alerts</Label>
                    <Switch
                        id="humidityEnabled"
                        checked={formData.humidity.enabled}
                        onCheckedChange={(checked) =>
                            setFormData({
                                ...formData,
                                humidity: { ...formData.humidity, enabled: checked },
                            })
                        }
                    />
                </div>

                {formData.humidity.enabled && (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="humidityMin">Minimum (%)</Label>
                            <Input
                                id="humidityMin"
                                type="number"
                                value={formData.humidity.min}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        humidity: {
                                            ...formData.humidity,
                                            min: Number(e.target.value),
                                        },
                                    })
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="humidityMax">Maximum (%)</Label>
                            <Input
                                id="humidityMax"
                                type="number"
                                value={formData.humidity.max}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        humidity: {
                                            ...formData.humidity,
                                            max: Number(e.target.value),
                                        },
                                    })
                                }
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Notification Method */}
            <div>
                <Label htmlFor="notificationMethod">Notification Method</Label>
                <Select
                    id="notificationMethod"
                    value={formData.notificationMethod}
                    onChange={(e) =>
                        setFormData({ ...formData, notificationMethod: e.target.value })
                    }
                >
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="push">Push Notification</option>
                </Select>
            </div>

            <Button type="submit" className="w-full">
                Save Alert Settings
            </Button>
        </form>
    );
} 