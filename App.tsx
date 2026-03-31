import {FlatListProps, ScrollViewProps, StyleSheet, Text, View} from 'react-native';
import Reanimated, {useAnimatedRef, useDerivedValue, useScrollOffset} from 'react-native-reanimated';
import {useCallback} from "react";


export default function App() {
  const animatedRef = useAnimatedRef<Reanimated.FlatList>();
  const scrollOffset = useScrollOffset(animatedRef);

  const data = Array.from({length: 100}, (_, i)=> `item-${i}` );
  const renderItem = useCallback<NonNullable<FlatListProps<string>["renderItem"]>>((info)=>{
    return <Text>{info.item}</Text>
  }, []);

  useDerivedValue(()=>{
    console.log(scrollOffset.value);
    return 1;
  })

  const renderScrollComponent = useCallback((props: ScrollViewProps)=>{
      return <CustomScrollComponent {...props}/>
  }, []);


  return (
    <View style={styles.container}>
      <Reanimated.FlatList
        data={data}
        ref={animatedRef}
        renderItem={renderItem}
        renderScrollComponent={renderScrollComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const CustomScrollComponent = (props: ScrollViewProps) => (
  <View>
    <Reanimated.ScrollView {...props}/>
  </View>
)
