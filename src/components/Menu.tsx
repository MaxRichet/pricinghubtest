import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface DropdownMenuProps {
  data: any[];
  onSelectionChange: (key: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ data, onSelectionChange }) => {
  const [activeLevel1, setActiveLevel1] = useState<string | null>(null);
  const [activeLevel2, setActiveLevel2] = useState<string | null>(null);
  const [activeLevel3, setActiveLevel3] = useState<string | null>(null);

  const uniqueNiveau1 = [...new Set(data.map(item => item.niveau_1))];
  const uniqueNiveau2 = (level: string) => [...new Set(data.filter(item => item.niveau_1 === level).map(item => item.niveau_2))];
  const uniqueNiveau3 = (level1: string, level2: string) => [...new Set(data.filter(item => item.niveau_1 === level1 && item.niveau_2 === level2).map(item => item.niveau_3))];

  const toggleLevel1 = (level1: string) => {
    if (activeLevel1 === level1) {
      setActiveLevel1(null);
      setActiveLevel2(null);
      setActiveLevel3(null);
      onSelectionChange('');
    } else {
      setActiveLevel1(level1);
      setActiveLevel2(null);
      setActiveLevel3(null);
      onSelectionChange('');
    }
  };

  const toggleLevel2 = (level2: string) => {
    if (activeLevel2 === level2) {
      setActiveLevel2(null);
      setActiveLevel3(null);
      onSelectionChange('');
    } else {
      setActiveLevel2(level2);
      setActiveLevel3(null);
      onSelectionChange('');
    }
  };

  const handleLevel3Selection = (level3: string) => {
    setActiveLevel3(level3);
    onSelectionChange(level3);
  };

  return (
    <div className='menu'>
      {uniqueNiveau1.map((level1) => (
        <div key={level1} className='menu2'>
          <button
            onClick={() => toggleLevel1(level1)}
            className={`button buttonArrow ${activeLevel1 === level1 ? 'active' : ''}`}
          >
            {level1}
            <FontAwesomeIcon
              icon={faChevronUp}
              className={`icon ${activeLevel1 === level1 ? 'rotated' : ''}`}
            />
          </button>
          {activeLevel1 === level1 && (
            <div className='level2'>
              {uniqueNiveau2(level1).map((level2) => (
                <div key={level2}>
                  <button
                    onClick={() => toggleLevel2(level2)}
                    className={`button buttonArrow ${activeLevel2 === level2 ? 'active' : ''}`}
                  >
                    {level2}
                    <FontAwesomeIcon
                      icon={faChevronUp}
                      className={`icon ${activeLevel2 === level2 ? 'rotated' : ''}`}
                    />
                  </button>
                  {activeLevel2 === level2 && (
                    <div className='level3'>
                      {uniqueNiveau3(level1, level2).map((level3) => (
                        <button
                          key={level3}
                          onClick={() => handleLevel3Selection(level3)}
                          className={`button ${activeLevel3 === level3 ? 'active' : ''}`}
                        >
                          {level3}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;
