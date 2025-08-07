import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

import { Authenticator } from '@aws-amplify/ui-react'
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

export default function MyAuth({ children }: LayoutProps) {
    return (
        <Authenticator>
            {children}
        </Authenticator>
    )
}