import { View, Text } from "native-base"
import React from "react"

const input = () => {
    return (
        <View style={[t.flexRow, t.m2, t.mL8, t.mR8]}>
            <Input
                placeholder="Subject"
                w={{
                    base: "100%",
                    md: "25%",
                }}
                onChangeText={(text) => setSubject(text)}
            >
            </Input>
        </View>
    )
}
export default input