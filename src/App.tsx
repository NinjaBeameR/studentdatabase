import { useState } from 'react';
import { ChevronDown, GraduationCap } from 'lucide-react';

type Section = 'primary' | 'middle' | 'high' | '';
type OptionType = 'attendance' | 'exams' | 'marks' | '';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedSection, setSelectedSection] = useState<Section>('');
  const [selectedOption, setSelectedOption] = useState<OptionType>('');
  const [selectedClass, setSelectedClass] = useState<string>('');

  const handleLogin = () => {
    if (password === 'admin@123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleSectionChange = (section: Section) => {
    setSelectedSection(section);
    setSelectedOption('');
    setSelectedClass('');
  };

  const handleOptionChange = (option: OptionType) => {
    setSelectedOption(option);
    setSelectedClass('');
  };

  const getClassOptions = () => {
    if (selectedSection === 'primary') {
      return ['Nursery', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
    } else if (selectedSection === 'middle') {
      return ['Class 6', 'Class 7', 'Class 8'];
    } else if (selectedSection === 'high') {
      return ['Class 9', 'Class 10'];
    }
    return [];
  };

  const getOptionsList = () => {
    if (selectedSection === 'primary') {
      return [{ value: 'attendance', label: 'Attendance' }];
    } else if (selectedSection === 'middle' || selectedSection === 'high') {
      return [
        { value: 'exams', label: 'Exams' },
        { value: 'attendance', label: 'Attendance' },
        { value: 'marks', label: 'Marks Card' }
      ];
    }
    return [];
  };

  const getGoogleSheetLink = (
    section: Section,
    option: OptionType,
    className: string
  ): string => {
    if (section === 'middle' && option === 'attendance') {
      if (className === 'Class 6') {
        return 'https://docs.google.com/spreadsheets/d/1w0w3QrSYFDJcJeRUbqBosK5svlMpHS23RKUnWQ5mWtQ/edit?gid=1070248714#gid=1070248714';
      }
      if (className === 'Class 7') {
        return 'https://docs.google.com/spreadsheets/d/1RLgEx3Al6c64yRfSDH4oymTetl3PcScNkwddm2WY8Yk/edit?gid=1070248714#gid=1070248714';
      }
    }
    // Add more mappings as needed
    return '';
  };

  const handleGo = () => {
    if (selectedSection && selectedOption && selectedClass) {
      const link = getGoogleSheetLink(selectedSection, selectedOption, selectedClass);
      if (link) {
        window.open(link, '_blank');
      } else {
        alert(`Google Sheet link not set for this selection.`);
      }
    }
  };

  const isFormComplete = selectedSection && selectedOption && selectedClass;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full">
          <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 leading-tight mb-2">
            HONGIRANA SCHOOL OF EXCELLENCE
          </h1>
          <p className="text-lg font-semibold text-blue-600">
            ACADEMIC YEAR 2025-26
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          {/* Section Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Section
            </label>
            <div className="relative">
              <select
                value={selectedSection}
                onChange={(e) => handleSectionChange(e.target.value as Section)}
                className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white cursor-pointer"
              >
                <option value="">Choose a section...</option>
                <option value="primary">Primary</option>
                <option value="middle">Middle School</option>
                <option value="high">High School</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Options Selection */}
          {selectedSection && (
            <div className="space-y-3 animate-fade-in">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Option
              </label>
              <div className="space-y-3">
                {getOptionsList().map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedOption === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="option"
                      value={option.value}
                      checked={selectedOption === option.value}
                      onChange={(e) => handleOptionChange(e.target.value as OptionType)}
                      className="w-5 h-5 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-3 text-lg font-medium text-gray-700">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Class Selection */}
          {selectedSection && selectedOption && (
            <div className="space-y-3 animate-fade-in">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Class
              </label>
              <div className="relative">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none bg-white cursor-pointer"
                >
                  <option value="">Choose a class...</option>
                  {getClassOptions().map((classOption) => (
                    <option key={classOption} value={classOption}>
                      {classOption}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          )}

          {/* GO Button */}
          <div className="pt-4">
            <button
              onClick={handleGo}
              disabled={!isFormComplete}
              className={`w-full py-4 px-6 text-lg font-semibold rounded-xl transition-all duration-200 ${
                isFormComplete
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              GO
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          Select your section, option, and class to continue
        </div>
      </div>
    </div>
  );
}

export default App;