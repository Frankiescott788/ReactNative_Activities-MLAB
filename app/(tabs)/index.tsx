import {useState} from "react";
import {
    Text,
    TextInput,
    View,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StatusBar,
} from "react-native";
import { Svg,  Path} from "react-native-svg"

interface Colors {
    id: number;
    color: string;
}

export default function Index() {
    const [image, setImage] = useState(require("../../assets/images/3d.jpg"));

    const [birthdayMessage, setBirthdayMessage] =
        useState<string>(`Lorem ipsum dolor sit amet consectetur adipisicing elit.
  Repellendus ullam aut velit quia similique officiis
  sapiente nesciunt asperiores aliquam sed?`);

    const [name, setName] = useState<string>("Joe Doe");
    const [font_family, setFontFamily] = useState<string>("Roboto");

    const fonts: Colors[] = [
        {
            id: 1,
            color: "Poppins",
        },
        {
            id: 2,
            color: "monospace",
        },
    ];

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="bg-white flex-1 " style={{}}>
                    <View className="px-4 py-4">
                        <Text className="text-4xl">
                            Create a <Text className="text-fuchsia-400">Birthday</Text> Card
                        </Text>
                        <Text className="text-gray-400">
                            Make your special moments unforgettable with a custom card
                        </Text>
                    </View>
                    <View className="">
                        <View className="mx-4 rounded-md">
                            <ImageBackground
                                source={image}
                                className="h-[30rem] w-full object-cover rounded-md"
                                resizeMode="cover"
                            >
                                <View className="h-[100%] w-full ">
                                    <View className="pt-[10rem]">
                                        <Text
                                            className="text-center text-5xl"
                                            style={{
                                                fontFamily: font_family
                                            }}
                                        >
                                            Happy BirthDay
                                        </Text>
                                        <Text className="text-center text-2xl" style={{...Styles.text, fontFamily : font_family}}>
                                            {name}
                                        </Text>
                                        <Text className="text-center px-[2rem]" style={{ fontFamily : font_family }}>
                                            {birthdayMessage}
                                        </Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>

                        <Text className="px-4 text-default-400">
                            Choose background image
                        </Text>
                        <View className="px-5 py-3">
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View className="flex-row gap-3">
                                    <TouchableOpacity
                                        onPress={() => {
                                            setImage(require("../../assets/images/3d.jpg"));
                                        }}
                                    >
                                        <View className="border border-dashed border-gray-400 p-1 rounded-md">
                                            <Image
                                                source={require("../../assets/images/3d.jpg")}
                                                className="h-[8rem] w-[8rem] object-cover"
                                            />
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => {
                                            setImage(require("../../assets/images/birthday2.jpg"));
                                        }}
                                    >
                                        <View className="border border-dashed border-gray-400 p-1 rounded-md">
                                            <Image
                                                source={require("../../assets/images/birthday2.jpg")}
                                                className="h-[8rem] w-[8rem] object-cover"
                                            />
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => {
                                            setImage(require("../../assets/images/birthday3.jpg"));
                                        }}
                                    >
                                        <View className="border border-dashed border-gray-400 p-1 rounded-md">
                                            <Image
                                                source={require("../../assets/images/birthday3.jpg")}
                                                className="h-[8rem] w-[8rem] object-cover"
                                            />
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => {
                                            setImage(require("../../assets/images/birthday4.jpg"));
                                        }}
                                    >
                                        <View className="border border-dashed border-gray-400 p-1 rounded-md">
                                            <Image
                                                source={require("../../assets/images/birthday4.jpg")}
                                                className="h-[8rem] w-[8rem] object-cover"
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                        <View>
                            <View className={"flex-row gap-2 mx-3"}>
                                <Svg  viewBox="0 0 24 24" width={20} height={20}
                                     color={"#9b9b9b"} fill={"none"}>
                                    <Path
                                        d="M14 19L11.1069 10.7479C9.76348 6.91597 9.09177 5 8 5C6.90823 5 6.23652 6.91597 4.89309 10.7479L2 19M4.5 12H11.5"
                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                    <Path
                                        d="M21.9692 13.9392V18.4392M21.9692 13.9392C22.0164 13.1161 22.0182 12.4891 21.9194 11.9773C21.6864 10.7709 20.4258 10.0439 19.206 9.89599C18.0385 9.75447 17.1015 10.055 16.1535 11.4363M21.9692 13.9392L19.1256 13.9392C18.6887 13.9392 18.2481 13.9603 17.8272 14.0773C15.2545 14.7925 15.4431 18.4003 18.0233 18.845C18.3099 18.8944 18.6025 18.9156 18.8927 18.9026C19.5703 18.8724 20.1955 18.545 20.7321 18.1301C21.3605 17.644 21.9692 16.9655 21.9692 15.9392V13.9392Z"
                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                </Svg>
                                <Text className="pt-2 ">Choose font</Text>
                            </View>
                        </View>

                        <ScrollView horizontal>
                            <View className="px-5 py-4">
                                <View className="flex-row gap-2">
                                    {fonts.map((color: Colors) => (
                                        <TouchableOpacity key={color.id} onPress={() => {
                                            setFontFamily(color.color)
                                        }}>
                                            <Text className="bg-blue-400 text-white p-1 text-sm rounded-full px-3">
                                                {color.color}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                            </View>

                        </ScrollView>
                        <View className="px-4 mt-[3rem] mb-10">
                            <View>
                                <Text>Name</Text>
                                <TextInput
                                    focusable
                                    className="py-[1.5rem] rounded-md bg-gray-200 "
                                    placeholder={"Enter recipient name"}

                                    onChangeText={(e: any): void => {
                                        if (e.length === 0) {
                                            setName("Frankie Mosehla");
                                            return;
                                        }
                                        setName(e);
                                    }}
                                />
                            </View>
                            <View className="pt-3">
                                <Text className="my-2">Birthday Message</Text>
                                <TextInput
                                    className="py-[1.5rem] rounded-md bg-gray-200 "
                                    multiline
                                    placeholder={"Enter Birthday message"}
                                    onChangeText={(e) => {
                                        if (e.length === 0) {
                                            setBirthdayMessage(`Lorem ipsum dolor sit amet consectetur adipisicing elit.
                       Repellendus ullam aut velit quia similique officiis
                        sapiente nesciunt asperiores aliquam sed?`);
                                            return;
                                        }
                                        setBirthdayMessage(e);
                                    }}
                                />
                            </View>
                            {/*<TouchableOpacity className="bg-[#7678ed] mx-[5rem] my-3 py-5 rounded-xl ">*/}
                            {/*    <View>*/}
                            {/*        <Text className="text-center text-white">Save</Text>*/}
                            {/*    </View>*/}
                            {/*</TouchableOpacity>*/}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <StatusBar animated/>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    text: {
        fontFamily: "Poppins",
    },
});
