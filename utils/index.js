const handleChangefn = (setValues, values)=> event=>{
  setValues({
    ...values,
    [event.target.name]:event.target.value
  })
};

export  {handleChangefn}