
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from './AuthContext';
import { useToast } from "@/components/ui/use-toast";
import { Mountain } from 'lucide-react';

export function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, login } = useAuth();
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [email, setEmail] = useState('');

  const handlePhoneLogin = () => {
    if (!phoneNumber.trim()) {
      toast({
        variant: "destructive",
        title: "Phone number required",
        description: "Please enter your phone number",
      });
      return;
    }

    if (!isVerificationSent) {
      setIsVerificationSent(true);
      toast({
        title: "Verification code sent",
        description: "Please check your phone for the verification code",
      });
    } else {
      if (verificationCode.trim()) {
        login({ phoneNumber });
        toast({
          title: "Welcome!",
          description: "You have successfully signed in",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Verification code required",
          description: "Please enter the verification code",
        });
      }
    }
  };

  const handleGoogleLogin = () => {
    login({ email: "user@gmail.com", provider: "google" });
    toast({
      title: "Welcome!",
      description: "You have successfully signed in with Google",
    });
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        variant: "destructive",
        title: "Email required",
        description: "Please enter your email address",
      });
      return;
    }
    login({ email });
    toast({
      title: "Welcome!",
      description: "You have successfully signed in with email",
    });
  };

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mountain className="h-8 w-8 text-primary" />
            <DialogTitle>Welcome to My J&K</DialogTitle>
          </div>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleEmailLogin} className="w-full">
              Continue with Email
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 XXXXXXXXXX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          
          {isVerificationSent && (
            <div className="grid gap-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
          )}

          <Button onClick={handlePhoneLogin} className="w-full">
            {isVerificationSent ? "Verify Code" : "Continue with Phone"}
          </Button>

          <Button onClick={handleGoogleLogin} variant="outline" className="w-full">
            Continue with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
