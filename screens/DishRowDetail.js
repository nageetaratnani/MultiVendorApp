import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import {
  PlusCircleIcon,
  MinusCircleIcon,
  ArrowLeftIcon,
  XCircleIcon,
} from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  selectBasketItemsWithId,
  removeFromBasket,
} from "../slices/basketSlice";

const DishRowDetail = ({
  id,
  name,
  description,
  price,
  image,
  isVisible,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image, quantity }));
  };

  const removeItemFromBasketHandler = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: 16,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <TouchableOpacity
            onPress={onClose}
            className="rounded-full bg-gray-100 absolute   top-2  right-2 "
          >
            <XCircleIcon color="#FC6D3F" height={50} width={50} />
          </TouchableOpacity>
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Image
              style={{
                width: 380,
                height: 300,
                borderRadius: 8,
                marginBottom: 16,
                paddingHorizontal: 16,
                marginTop: 25,
              }}
              source={{
                uri: urlFor(image).url(),
              }}
            />
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
              {name}
            </Text>
            <Text style={{ color: "gray", marginBottom: 8 }}>
              {description}
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              <Currency quantity={price} currency="PKR" />
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <TouchableOpacity
              onPress={removeItemFromBasketHandler}
              disabled={quantity === 1}
            >
              <MinusCircleIcon
                color={quantity > 1 ? "#FC6D3F" : "gray"}
                size={40}
              />
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 16, fontSize: 18 }}>
              {quantity}
            </Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <PlusCircleIcon size={40} color="#FC6D3F" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={addItemToBasket}
            style={{
              backgroundColor: "#FC6D3F",
              padding: 12,
              borderRadius: 8,
              marginTop: 16,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Add to Basket
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DishRowDetail;
