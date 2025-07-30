import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import { RealtimeAgent, RealtimeSession } from "@openai/agents/realtime";
import type { Schema } from "@/amplify/data/resource";


import ToggleSwitch from "@/components/ui/ToggleSwitch";
import Body from "@/components/layout/Body";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";
import { Button } from "@aws-amplify/ui-react";

import { CasualPrompt, IELTSPrompt, TOEICPrompt } from '@/services/prompts/realtimePrompts'


// Emphemeral key
const client = generateClient<Schema>();

const getKey = async () => {
  return client.queries.getEmphemeral({ name: 'Amplify' })
    .then(apiResult => {
      if (apiResult.data) {
        return JSON.parse(apiResult.data)
      } else {
        console.error("No data in apiResult");
      }
    })
    .catch(err => {
      console.error("Error fetching key:", err);
    });
}

// Realtime API
let session: RealtimeSession | null = null;

const getSession = async (agentSelected: string) => {
  const data = await getKey();

  let agent: RealtimeAgent;

  switch (agentSelected) {
    case 'IELTS-Style':
      agent = new RealtimeAgent({
        name: 'IELTS Examiner',
        instructions:
          IELTSPrompt,
      });
      break;

    case 'TOEIC-Style':
      agent = new RealtimeAgent({
        name: 'TOEIC Examiner',
        instructions:
          TOEICPrompt,
      });
      break;

    case 'Casual':
    default:
      agent = new RealtimeAgent({
        name: 'Conversation Tutor',
        instructions:
          CasualPrompt,
      });
      break;
  }

  session = new RealtimeSession(agent);
  await session.connect({
    apiKey: data.client_secret.value,
  });
};

const endSession = () => {
  if (session) {
    session.close();
    session = null;
  }
};

export default function PracticePage() {
  const [active, setActive] = useState(false);
  const [agentSelected, setAgent] = useState('Casual');

  const handleStart = async () => {
    await getSession(agentSelected);
    setActive(true);
  };

  const handleStop = async () => {
    endSession();
    setActive(false);
  };

  return (
    <Layout>
      <Header pageTitle="Practice"/>
      <Body>
        <ToggleSwitch
          options={['Casual', 'IELTS-Style', 'TOEIC-Style']}
          value={agentSelected}
          onChange={setAgent}
        />
        <Button onClick={handleStart} isDisabled={active}>
          Start Session
        </Button>
        <Button onClick={handleStop} isDisabled={!active}>
          End Session
        </Button>
      </Body>
    </Layout>
  );
}