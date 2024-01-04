// App.js
import React, { useState } from 'react';
import MentionInput from '../components/MentionInput';

const App = () => {
  const [mentionValue, setMentionValue] = useState('');

  const handleMentionChange = (newValue) => {
    setMentionValue(newValue);
  };

  return (
    <div>
      <h1>Frontend assignment</h1>
      <MentionInput
        onChange={handleMentionChange}
        value={mentionValue}
      />
    </div>
  );
};

export default App;
