import React, { useState, useEffect } from 'react';
import mentionData from '../data/data.json';

const MentionInput = ({ onChange, value }) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [mentionOptions, setMentionOptions] = useState([]);
  const [selectedMention, setSelectedMention] = useState(null);

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputValue(text);

    if (text.includes('@')) {
      const mentionQuery = text.split('@').pop().toLowerCase();
      const filteredMentions = mentionData.mentions.filter((mention) =>
        mention.toLowerCase().includes(mentionQuery)
      );
      setMentionOptions(filteredMentions);
    } else {
      setMentionOptions([]);
    }

    onChange && onChange(text);
  };

  const handleSelectMention = (selectedOption) => {
    setSelectedMention(selectedOption);
    setInputValue((prevValue) => {
      const mentionIndex = prevValue.lastIndexOf('@');
      const newValue =
        mentionIndex !== -1
          ? prevValue.substring(0, mentionIndex + 1) + selectedOption + ' '
          : prevValue;
      return newValue;
    });
    setMentionOptions([]);

    onChange && onChange(inputValue);
  };

  return (
    <div>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
      />
      {mentionOptions.length > 0 && (
        <select onChange={(e) => handleSelectMention(e.target.value)}>
          <option
            value=''
            disabled>
            Select Mention
          </option>
          {mentionOptions.map((mention) => (
            <option
              key={mention}
              value={mention}>
              {mention}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default MentionInput;
