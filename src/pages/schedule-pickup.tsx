import { useReturnProcess } from '@/hooks/useReturnProcess'
import { getLayout } from '@/layouts/ReturnProcessLayout'
import axios from 'axios';
import { useEffect } from 'react';
import Router from 'next/router'


export default function ReturnProcess() {
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    console.log({ userId, token })

    axios
      .post("http://localhost:4100/api/authorize", { userId, token })
      .then((a) => console.log(a))
      .catch((a) => console.log(a))

    if (!token) {
      Router.push("/signin")
    }
  });
  const { getCurrentStep } = useReturnProcess()
  return getCurrentStep.component
}

ReturnProcess.getLayout = getLayout
