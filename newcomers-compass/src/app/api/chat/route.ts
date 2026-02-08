const siteContext = `
You are the assistant for "The Newcomer's Compass," a community resource website.
Primary sections:
- Resource Directory: searchable list of community resources (dynamic data from Firebase).
- Community Spotlights: featured programs like "Public Library ESL Program", "Neighborhood Welcome Committee", and "Transit Advocacy Group".
- Submit Resource: a form for submitting new resources for review.
- Admin Portal: for administrators to manage resources.
- Reference Page: includes sources, TSA documentation, and a framework/template statement.
Required TSA documents are linked there: Student Copyright Checklist PDF and TSA Work Log PDF.
The site was built for the TSA 2025-2026 Webmaster event with Next.js, React, Tailwind CSS, and Firebase.
`;

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ message: 'OpenAI API key is missing.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const body = await request.json();
  const messages = Array.isArray(body?.messages) ? body.messages : [];
  const sanitizedMessages: ChatMessage[] = messages
    .filter((message: ChatMessage) => message?.role && message?.content)
    .slice(-12);

  const payload = {
    model: 'gpt-4o-mini',
    temperature: 0.3,
    max_tokens: 300,
    messages: [
      {
        role: 'system',
        content: [
          siteContext.trim(),
          'Keep responses short, friendly, and focused on the website.',
          'If a question is outside the site, ask a clarifying question or suggest where to look on the site.',
          'Do not invent details about local services beyond what the site provides.'
        ].join(' ')
      },
      ...sanitizedMessages
    ]
  };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ message: 'OpenAI request failed.' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    const message = data?.choices?.[0]?.message?.content?.trim();

    return new Response(JSON.stringify({ message: message || 'No response from assistant.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Unable to reach OpenAI.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
