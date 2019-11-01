import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Form } from './src/Form';
import { SimpleCodeC } from './src/SimpleCodeC';
import { InterfaceScreen } from './src/Interfaces';
import { Optional } from './src/Optional';
import { ExactScreen } from './src/Exact';
import { CustomFormatting } from './src/CustomFormatting';
import { DateStringScreen } from './src/DateString';

const App: FunctionComponent = () => {
  const [step, setStep] = useState(0);

  const renderBody = () => {
    switch(step) {
      case 0: {
        return <SimpleCodeC/>;
      }
      case 1: {
        return <InterfaceScreen/>
      }
      case 2: {
        return <Optional/>
      }
      case 3: {
        return <ExactScreen/>
      }
      case 4: {
        return <DateStringScreen/>
      }
      case 5: {
        return <CustomFormatting/>
      }
      default: {
        return <Form/>
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Button 
          onPress={() => setStep(0)}
          title={'SimpleCodeC'}
        />
        <Button 
          onPress={() => setStep(1)}
          title={'InterfaceScreen'}
        />
        <Button 
          onPress={() => setStep(2)}
          title={'Optional'}
        />
        <Button 
          onPress={() => setStep(3)}
          title={'Exact'}
        />
        <Button 
          onPress={() => setStep(4)}
          title={'Convert Types'}
        />
        <Button 
          onPress={() => setStep(5)}
          title={'Custom Formatting'}
        />
        <Button 
          onPress={() => setStep(6)}
          title={'Form'}
        />
      </View>
      {renderBody()}
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

export default App;
