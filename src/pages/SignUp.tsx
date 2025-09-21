import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wheat, ChefHat } from 'lucide-react';
import { Header } from "@/components/Header";
import { FormData, UserType } from '@/types/auth';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    location: '',
    userType: 'farmer',
    whatsappOptIn: true,
    kitchenName: '',
    capacityPeople: 50,
    storageCapacity: '',
    address: ''
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    checkUser();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleUserTypeChange = (value: UserType) => {
    setFormData(prev => ({ ...prev, userType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone_number: formData.phoneNumber,
            location: formData.location
          },
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (signUpError?.status === 409) { 
        throw new Error("This email is already registered. Try signing in instead.");
      }

      if (signUpError) throw signUpError;

      const user = signUpData?.user;
      if (!user) throw new Error("User not returned from signUp");

      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: user.id,
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          location: formData.location,
          user_type: formData.userType,
          whatsapp_opted_in: formData.whatsappOptIn
        });

      if (profileError) throw profileError;

      if (formData.userType === 'kitchen') {
        const { error: kitchenError } = await supabase
          .from('kitchen_details')
          .insert({
            user_id: user.id,
            kitchen_name: formData.kitchenName,
            capacity_people: formData.capacityPeople,
            storage_capacity: formData.storageCapacity,
            address: formData.address
          });

        if (kitchenError) throw kitchenError;
      }

      toast({
        title: "Account created!",
        description: "Please check your email to verify your account."
      });
      
      navigate('/login');
    } catch (error: unknown) {
      let errorMessage = "An unexpected error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">
              Join Kaiǀūb
            </CardTitle>
            <CardDescription>
              Create your account to start connecting food surplus with community kitchens
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+27 12 345 6789"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="City, Province"
                />
              </div>

              <div className="space-y-2">
                <Label>I am a:</Label>
                <RadioGroup value={formData.userType} onValueChange={handleUserTypeChange}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="farmer" id="farmer" />
                    <Label htmlFor="farmer" className="flex items-center gap-2">
                      <Wheat className="h-4 w-4" />
                      Farmer/Producer
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kitchen" id="kitchen" />
                    <Label htmlFor="kitchen" className="flex items-center gap-2">
                      <ChefHat className="h-4 w-4" />
                      Community Kitchen
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.userType === 'kitchen' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="kitchenName">Kitchen Name</Label>
                    <Input
                      id="kitchenName"
                      name="kitchenName"
                      value={formData.kitchenName}
                      onChange={handleInputChange}
                      required
                      placeholder="Community Kitchen Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Kitchen Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="Full kitchen address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacityPeople">Daily Capacity (people served)</Label>
                    <Input
                      id="capacityPeople"
                      name="capacityPeople"
                      type="number"
                      value={formData.capacityPeople}
                      onChange={handleInputChange}
                      min="1"
                      placeholder="50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="storageCapacity">Storage Capabilities</Label>
                    <Input
                      id="storageCapacity"
                      name="storageCapacity"
                      value={formData.storageCapacity}
                      onChange={handleInputChange}
                      placeholder="e.g., Refrigeration, Freezer, Dry storage"
                    />
                  </div>
                </>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="whatsappOptIn"
                  checked={formData.whatsappOptIn}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, whatsappOptIn: !!checked }))
                  }
                />
                <Label htmlFor="whatsappOptIn" className="text-sm">
                  Opt-in for WhatsApp notifications about surplus matches
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Link to="/login" className="text-sm text-primary hover:underline">
                Already have an account? Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default SignUp;
