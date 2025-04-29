import { Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { categories } from '@/constants/data';


type FilterProps = {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

const Filter: React.FC<FilterProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 mb-2">
        {categories.map((item, index) => (
            <TouchableOpacity
                key={index}
                onPress={() => onSelectCategory(item.category)}
                className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${
                    selectedCategory === item.category ? 'bg-gray-300' : 'bg-transparent'
                }`}
            >
              <Text>{item.title}</Text>
            </TouchableOpacity>
        ))}
      </ScrollView>
  );
};

export default Filter;

//
// const Filter = () => {
//   const params = useLocalSearchParams<{ filter?: string }>();
//   const [selectedCategory, setSelectedCategory] = useState(params.filter || 'all');
//
//   const handleCategory = (category: string) => {
//     setSelectedCategory(category);
//   };
//
//
//
//   return (
//     <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 mb-2">
//       {categories.map((item, index) => (
//         <TouchableOpacity
//           key={index}
//           onPress={() => handleCategory(item.category)}
//           className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${
//             selectedCategory === item.category ? 'bg-gray-300' : 'bg-transparent'
//           }`}
//         >
//           <Text>{item.title}</Text>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );
// };

