import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ResolveRoute() {
  const router = useRouter();

  useEffect(() => {
    const lowerCaseRoutes = router.query.route.map(param => {
      return `/${param.toLowerCase()}`;
    });
    const newRoute = lowerCaseRoutes.toString().replaceAll(',', '');
    router.push(newRoute);
  });

  return <p>Redirecting...</p>;
}
