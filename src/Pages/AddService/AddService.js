import React from 'react';
import { useForm } from 'react-hook-form';

const AddService = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const url = `https://infinite-spire-22635.herokuapp.com/service`;

    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };
  return (
    <div className="w-50 mx-auto">
      <h2>Please Add a service</h2>
      <input
        className="mb-2 w-100"
        placeholder="Name"
        {...register('name', { required: true, maxLength: 20 })}
      />
      <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        <textarea
          className="mb-2"
          placeholder="Description"
          {...register('description')}
        />
        <input
          className="mb-2"
          placeholder="Price"
          type="number"
          {...register('price')}
        />
        <input
          className="mb-2"
          placeholder="Photo URL"
          type="text"
          {...register('img')}
        />
        <input className="mb-2" type="submit" value="Add Service" />
      </form>
    </div>
  );
};

export default AddService;
