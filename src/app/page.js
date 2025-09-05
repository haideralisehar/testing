"use client";
import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaSearch,
  FaPlus,
  FaMinus,
  FaTrash,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../app/HotelSearchBar.css";
import { useRouter } from "next/navigation";

// ✅ Static Hotel Data
export const hotelsData = {
  Islamabad: [
    {
      id: 1,
      name: "Islamabad Serena Hotel",
      location: "Khaliq Uz Zaman Road, Islamabad",
      price: 120,
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/269205507.jpg",
    },
    {
      id: 2,
      name: "Marriott Islamabad",
      location: "Agha Khan Road, Islamabad",
      price: 90,
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/181941619.jpg",
    },
    {
      id: 3,
      name: "Hotel One Super",
      location: "F-6, Islamabad",
      price: 75,
      image:
        "data:image/jpeg;base64,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",
    },
  ],
  Lahore: [
    {
      id: 1,
      name: "Pearl Continental Lahore",
      location: "Shahrah-e-Quaid-e-Azam, Lahore",
      price: 150,
      image:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSEhIWFhUXFxgVFRcYFRcYFxcXGBcXFxYdGBgaHSggGBolHRgVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGy0lICU1Ly0tLS0tLS0tLS0tLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAIDBQYBB//EAE0QAAIAAwUDCAYGBwUHBQEAAAECAAMRBBIhMUEFUWEGEyIycYGRoUJyscHR8BQjUmKy4SQlM3OCs8N0kqK0whU0Q2Nk4vFTk5Sj0hb/xAAaAQACAwEBAAAAAAAAAAAAAAABAwACBAUG/8QALxEAAgIBAwMDAwMDBQAAAAAAAAECEQMSITFBUXEEEyIyYcEUgZGx0fAFQlOh0v/aAAwDAQACEQMRAD8A1tl5ZrlMlHtRgfJqU8YvrFygs7/8QL69V8zh5x5vOszy+ujKfvKR7Ynsi178fKOTH1mSP1Hfl6HHP6dj1qSQwqCCN4xHjE3NxjOSApOUDUNXjhG1U9EUjo4cqyQ1Ucn1OF4Z6bsgmSAdIrrTYdRgeEXKsDl+cRzZcMcUxUZNGcadNTWo4/GOrtUekCPMRYWmSIqbTZ4TLVEeqYclpVsiDHSYoJknuh8u1TF9Kvb8YCy9w6C3nSVbrKD7fGKTaHJmW5vL0W0YG6w/iHvrB8raq+mpXjmPjB8icj9Vgez4RdOMgO0ZZZtss2DfXJ97ov3OMG74srBt6TNNwky5n2JgunuJwPdF9cBgC37CkzRRkHhh4fCkWplbRNzccMqKX/ZFps+NnmllH/Derr3ekvdWJZHKIL0bTLaScr3Wl/3h1e8RPJPBZtJiF5UGSnVwGUhgciCCPEQmSDRLKp5UQukWcyXAs1Io0WTK91iFhBcxYHmLFGWB2iMxOREZEAIykICHUhsAg6kdCxwRIogkOqInlrDFESicqjEgdpAgoDZ2atBAWy5V+cx+ytO9j/2w23bWlUID3juUFvZBXJNKo8wqRec0DChotAMO2sGrYL2LZLNBUuxxIjARO1uFKYQ1JC22RCyxyGG3wonxBuYeRystSjF1cffQHD+G7F1snaMq0TESZZZYLki+pKkYE5Urp9qMbKl1i/5MSytolE/b935xx8OXJKSUna++53M2HFGLlFU66bGj2ZKWVbzLTBRkKk5ygTieNY1daAdvxjKyz+tO7+iI0VqnhEvE0AJ98dPCkoy8s5PqblKLfZE09K9JcG8jwPxgC0bYp0QpL5XdQeMDSZk6ear9XL+1qezf3eIixaTdFZZq4FKtiWG4nSLW3uhNJbMB+jzT05z3dyLQH+Js+4flFHaLUysVJ7DvHxi8+mCYDoRgynMGM/t10VSWNN2+vCKSe2w2K7kL7SHpCOJbJbZMPGKRpLTaMWuIRX7zDeoOFOPtiGeFpdUXQMt4O+uphDYyjTZw0yhnkd4wMZeTbGWtWpTPGg7eyDZG15lKkYaVwYjfTTsgWiUzTSbZNXJrw3N8RjFlJ2snpgr5jxGPlGXkbWU5jwg4TwQCCCDgMcSd2OsOjkaFuKNRKmq4qrAjgawy0WRH6yg+3xjOAitcQd4wPjFhZbe4IF68Dvzy3wxZl1KaH0BJ/Jq4S9mmNKbcOqe1eqfAdsR/7VtEnC0Sbw+3KGPehz/hJ7IsNrWt1ClWpnoPfAth2tMY3XCniMK90HWroNMnsu05U4VluGpmMmHapxHfCmCIbbsGVPIa4VfRlwYdhGI7orplltcjIiem5sJg7xn3jvguyKg2YIFmLEMjbAeoEmdeGBFylD6xND3GOzJk5urKC+u2PgoPtijLDHERkw76BPbNwPVUDzasdGwAevMJ7XJ8lwgUwOSXIPMtaL1mA7xELbRQ9UM3qqYtpWx5C7u5R7TBKSpS5KT2xPLKvIuiM+J8w9WV/eYDyFYnl2W0tqq9ik+34RffSKZIo7o79KffSBce5XXLsVUvk/MbrzH8bo8BSCpPJ2UuLXT24+2sFXycyYQWDrj2Bc31HpZpK4e6JlmoBRR7ogCRIEia32Cl3YyZPOggebOaDDKiJpMVepl0kV5Zt8KDDJhRSmWMRLlnHti62ET9IkeuPfAlwAdpHtg7Yf7WQfvr5mMWJfJeTs5n8JeGXtf1p3f0Y0VsS8oGFb2FRUVxpUaiM1MP60Xs/omNFam6I9b4x08fEvLORm3cPCAZe1mvGXNF1hn35dx0Iw78ILabFdtIy5i/WNcZepM1XeCPSU6j2GhigW0TnPMq4GJBa90KCmIbMjEYDHTCKubRVRTLHa9pV3Alk8/1RdFb3A8ePjhiArLsxcZtobnH0l+ip+/XrHhkOOcWljkS7MDzfSmEUaYc+IUeivDxrAG0Omb4NHHcGG48dx+RVrqyyK/arFzUnHQ7vyiktE4DMY1pQYmvDfB1ptbORLloS5yHZnXcBqTlEbWbmx1r0zVh1R90cN51hb3LrYB5ps2pezVcDT1jv7MoklvXt86xxmrj4jcYg6wJp0dcev8AEe2KcFgyVMr0UyPpDCu8Kd3HwiPlXYXmWeRLlrVjMNBUDKW7HEkAYAxLZRepdxrlT5wgzbgDSZJBDCs4VGRpZZ4JHDCLLdAWzRj5c232bSeo4gunnVY1PI/b0y0TAr3DShqoocTdxxprujBWK1TZX7Oa6cFdgPAGPRORs15xkzJhvNWYpYgVIDSKVIGOZ8YXidy2Y7MqjbSNLt7BU7T7Ii2DZlmOQwrhXzEFcqFoiesfZHeSP7RvV94jXFfMxN/Gw232JpQvS2I4E1H5RQzNrzAaFa8Y2u0EqhjGzZALw3ImuBcHfI6VPYjIDXCOtU6wSkqOMsLaYxUCXYQEPm4AmM3M5WWcEAGYSTQUQjGgPpU0MKk0uWHS3waO7HDSMo3K5CCVlTD0S2JUYBQ2hOhgP/8ArmJIWQBSoxcnISjov/NHhC/cj3J7MjaGYIcswRiByonNZ3nKksEc3QUYijiprjnlAk3lFaiZ4EwDm+cpRF9GXLdc6/aaJ7kSe0ejK8TyxWPOJFvnu6Bp8yjLIJoQvXScW6oGqg90VUqZNmSpzGdMJEmQ/SmORjS/rrjBWRdg+0kex3EHWanaQI7KtEhqqkxGalaBwx8AY862Rs9WnpVQa2aSxr9ozVNY0vI2wqslHCgErQkDPHWLQzOTqiSxqKuzRUhrLEyrCuQ+hQIVhQQZcKJQbMFPwEP2BaT9IkjS+n4lgO12kUw3fGB+T80/SZH71PxrHAxZXqXk9NmxrQ/DNtaJn62Qfd/otF9tS0BJRY6MfaYy1rb9cSvUP8qZGnteKUrTpGhGYNWoRHYxztT8s4maNOHhfkobLs15x52eSkvMDJ27B6A457qZxaWi0Iyc1cAljBQMCvEbj8msVVptMxHCzDieqa9Fx90796nEcRjHHtagVrBjJcC3HqRTZrSTdfpKeow14cG4eEBTJ7z25uSOLMcAo3sdOzMxLZi1pJBN2Sp6bYZjEBa5vXuHlDnBkLcUgyy1QwFCSdH+97eGUD+hBT0WWt2SSWAo7EAc7rjuzNNNOMVU2aKVr869kF2ieAKkwGLKXXnWGZBVDhfUandpSudMdID+wUC81fF4jo6A4X/+3PPPsjt69l4e6kETZt7H57KadkCEXqkVpkaelwG/j4RR7FjoOYB6J61Mjv8A4d+/sjRWyQDIkAb5vnZbRFDJ6VKU9wHuEXfOgS5NKlb82ld30a0Dw90U16di0Y2zz4WM0rSN/wAhpdFk9s38VmgCxWSW8oNUZYwdyanCssLkGm/jskYPS52p7nS9ZiXt7f5saXld1E9Y+yIeSL/WN6n+pYXKhqonre4xDyWNJjep/qWO1ilrakcSSqNGwnNUGM40r6wxdPMwivlirGNMhMdhvNRBMWLEiBJyxRosmVVtwRzuVj5GPKwlXlneWP8A9CGPVdqYSpnqH2UjzOQmMrv/AJCxh9RyaMRyzSfqif8AkN/KWI5ErpP6/wDos3wg6zS/qCf+nb+WIiloQ7+v/TkfCMUXvL/OxofQgkKBYW3l5Q7gJXxgd1xtZ/ef5dIKsik2Sn35f+iv4RHJkr/eu2b/AJYRohK2KapB9jSjSvVs34J0D7Nlfo08/wDSyT5flB8laNL9Wy/gmxHs1P0Sf/ZJHsMWvZkZb7GH144WezjxmJGm5Ip+iy/V98ZnZR/SG/c2UeLpGn5Hn9Hlj7vvg4frRXL9LLsLCIhxMcJjo0ZBl2Ox2OwKCeWbQspRihzUlT2iogXYgpapH71PxrGt5e2IhufRSVNA9B1ToTuBGHdxjGbHnfpMj99L/mLHmIQcclfc9RHKsuHV9jYW4/reT6v9KbGptJ6H8R9rRkdoN+t5Hqf05ojS7QmESzQEm8QABUk1OkdjHxPy/wAHHzf7PC/JWW22IVKTAGXUHSmoPokb4qWsUwqGdX5nO9UBmTS9TED71MscMyfIsIBvz6E5rKBqK6GYfSP3cu2CXtrk1rDEr5EvbgGe0AgKoCqooqjAAcIFtFoCqa0oRiDlTjD7VLCdNMB6SaCuqbvVy3U1jslnVzzj4qD0EzqRq/Z9mLbgBVspFyZNWqHpKD/hMwHTIjurjDrTNJJJMHT3YkkmKadLJvXa3AQCRjdrmBwp4ewMJEU5y8RkOtQ0vHcONPd3JnBywAwA3cKQS9KALQKBgKwE1maYTcRmpmAD0zuHGnwirQbGLj0lBpqPtakgfNc+2+W0IZdmJPRvvX/484H3xVNZZwo3MzBu6Br4DER21VaXIwoTNmYDjZ7RCJx6Dcb3LiwLZJ8yWkmtyv1mQ6NOHZTvi2tuz5EiZK+jno9K8LxPSaZIpnwQ+EeTWJ5aLiKkihxOI7I0vJcl+beubzPJrEB5UjBihptJfvW/9Td6iEqT1bLp/c2nKGZ0E9b3GIuTkzpn1feIbtxSEWv2vcYg2FM6Z9X3iOt6T6UcrMuTVu+EQWdsTEbTujAabQRW6R3abzh4xsnJLkzxi3wXRgebAX+2pWV7EkjI5jP2GGytpS3PRcHPywMU9yL2TLaJLoDbaakmZ2e8R55ZV/ZH1v5VI3nKKZSQ3GgjCyVoJfYx/wABjD6p/I0YVsEWdf0Yf2d/wREqfWds3+lK+ESWc/oo/cN+Aw1B9cv70fyV+EZI/Ux74Qyxyv0VeM1fLD3R2fKH6T603/LCJbGKypKAYXw1e9jDrQP2/Fp3+WURfG92Vktidloydlm/C4iHZWNmnf2SR+Ew+3WgSyDdZiBIoqirG6GNAN8LZKFZM4MrL+iyU6SslWUMpAvAV08RF09n+4GuGH7PFLRM9Syj/EsaLki/1KD7nwjN2Q0nTD/Zh5rF1yXmURB9wewQzC/mheVfFmovwr0D85Dg8dQxk9YURX45ACedbXt0yaKNOcjUVovgKCKbZUilpkfvpf8AMWIZ089LgfjE2x3+vk/vZf41jzOFTtW7PVZHBRaSo1e0x+t5HqD8E2NLbQDLIOV4g+J8IoNqj9bSD91fZOEaK2y/qz6x9pjsQVKXlnEyu9HhfkzdqRpWJ6SaOBl64GXaMOyNNYdjy3VWWacQCMBr3xQ2u0FFJrw/KmsW3JyW6SReoDebAeiCbwB0rjDcVaqaEzuiwlcnFDhzMrTqi7QA788Tu3Q+bsKUWvF2rqRdFe2oNe3OJPpRiNrZujYoQ7CLl3ONsWRkQzdrEeykOCypK0lIq9gp474He0mB5rEwaiuEDcmlziRXLTKIptpO+IL9AQBn8/CBzIdsqwGwk72nCMrtkiWsqrKo+kTMWIAAaRPC1Jy6wjTrsuYdKdppEe0Ni2abLCWgKwBvYMymoBANVI0MZ82NzqhuOai9zzGwpIkpNWbPkuZi3VKI8wyzjiDdpXHeMs4tuSNrlLMSXLZ2C3mLOoWpeZZhgAxw6Gu+LpeR9hYm5LmzAcgHYKP4hQeJhqchRLYzJDNLNAAjTSwwZWzC1HVzqeyMz9NJGqXqIyXLL3b9orLX1/c0V2y3o59U+0RXTtlbTLoGEky71WCzCzUodXVYNstinIxJltlTfqN0NxxceUZp0y2tlr6NAYz862SyXdZwZqqjIGYEAkKaAZkY5ccY5tK0mUfrA9dyy3Y+QoD2kRlF2rzc9pySsTkGopWoAYkA0qffFPVS2L4IUaqbaqZsy16Nb+IUVoekuZwjv08Sws8sKsOjLLrW7WlRhie/SKVOWU3WRX+Kvuin5RbWM08+JYUi6tDUqcycqRjhJ6kaJRtUeg7btgeStDgzDwukj3Rn5ygc2Nyn+XWMvZuVRZkQyR0cRRjopOR0g3bXKQlUmtLHpABQFwClRWmcPzQ1yuxENti3kf7ov7n/AENENpb63A0pMFTu+rIz7oFsNonOguBioApSgAwyxIEOtCzmQi4akEAlsAdMiYyPk0KIWz3AaMRQg5YAcO7WOpaQSVqpvAkVwJLLdNSN4wrugSXOUMEmuyFRdNAGXECmNRD7QZCj9vjQ0JugVI11pArsW8lbtPbpM1KKBzbSnqK1+rdaUqdxbTWPQtsbQvSXFc1PljHjK2m+07EfszlvvJSNzNtU2agMmTMZCtLwGGIoaRolBxikLTTLSXaQJkw/es/lzZgjk/tUBL7FAoooLNdANKYscBpnvigtDzJfOM6MvSlEXlIBoF1I4Rkpe3JsoUluBihIKqwP1QxxGBzEHAt7FzV7Hqe0OU5UPUyTLGNUnyXYrhhdDEk14RDsnby2oqZYRRKYBlNTMwxGIGRxjzZOUs41vCW1c6ph4CgEPsm3ClfqJRqamob3nCLTjL3Navb77F441pqv+j1ubt60A0Wysw+0HQA76AtWnb5Qo80XlWf/AEfCbMA7gDhCjV+tl/xR/mX/AKF/pV3f8L+x6ntC0SXkTZVms7XmRlFJHNrUggUYgDvrGa2byWtCvLmPcQK6sbz6KwJ6oIrQb4z9v5S2t61tBp910T8FDAezZTWnnS73iqMysZhJBWl4VJpkykd8Z4xWWSpfge7wwdvn93+Df260I+0pDI6sAFBKkEV+swJGuIw4xq56ky2oCekchU9aPPNn2GVJ5udLSYCpVy7zahhmaLdAFRxMes7OtEtkDyyCrC8CMag611jZHDJJ6upiyZU609DNydkzGN8yySOqDgF440qeMWmy7C8tSJmbMW7MAKE93nFzzu6BZu0kBoCXO5RePgIZHAluLeRsEmSSdI4tiO4+z2xMbdNPUkN2sVUd4Jr5Q0raGzaWnZV/Ki+2G6SliFhOtB5/PjHHWUgqz+wCENnV/aTXbgKKvl0vOJ5VllriEFd5xb+8cYtSJYF9IU/s5N7caYeJw84ddtDfYljxPgMPOLAtEZaJRAFtnV68xm8h8fOEthlrkgrvIqfE4wUzxGzQGEjYRGREjGGGKhGGGGHmGMYFEGGIpkOmzgIrrTbKRKIC7Tsslx05SNxuivcwxEeXbbR6zJKSXYB6KVBaoGIyG40j0afaC1YbMmI8ppTG6aGjVoKjEGoyxpGbNjg2nQ/DKSPHtnyWSbVk6QwuAkNiKYrmIsNvyLsgFgymtApxoCGJqaCpjVT9jzXFXl3xkLxVvCpMQy9iyp/1Ux7hBwQqQuGBp0hQ54cYU95WaXgUVeorVRriGW5GAwORw0iWXtSenWXDeMaRY2jki6ismYURRlS+pFa4g4+cU05rRLH1km+Mr0s4/wB04xmngl5BHLEEtd6cHJY1JzJOIw93sittOybstnL1K0wpxAOZi1mW+UyFgboGBqCMajOvbFdbtoyzLYLeauFQppXtMHF7idJAm4dyosmBanCvZWNVsjlnPloq3pbLeCBWYCmgzyHGKGxzECBGlXi8xDevMpCjrLuNccaYRckyGaUsomWOdqQ/TVSEYg5BiMhi0asijLkRGTitjTWfl4VNJkkjGhuEMOORIPjGKtO0BNY3UUEEGt0VNKgVOsWm2rIEUuHkMTVg0ssGqFApkaaGhaM5ZK1djqoOudT898JhjSTY5ztpG9s+0pU1FZrNZ3DAGvNAHxiQSrE3Xsd31HYeQIjD2W3T5ahQ3RAAAKKwoOIxgyXygmKekqHuZT7fdDrZnVrg142Ts4/8OcP4z/8AqFGZXlP/AMof+5/2woFvsg6p93/JpzyXtIlzJnM0Evr5E54gUriMyMCBA0rYU+col8zRKsxZ6LSooCpIqKVc8b5xEGWzljaXAC9FRgBgFA4KOiPCKmdtCfMPTnNTcMBGZZIY5XBv9zc8U8kamkHvsZJU2WJ6y5iihZmZ5t0VoRVyaHDIDWPSuSJVbOXU0lsS6LQBVTLo7gSCe8R5JIlCZMWWpqzsFBOJF40rjuzj03lLP+jWXm5eASXhTcF6I8hGj0827kzP6iKjUUX9jm/SOmTSV6KDAvQ9Zju3AZ8RFtLoBQAAaACg8Iyewp5WTLDHAIoB1wUDGkaCVaMN8boTsxyiHXoaWiFZoMIvDCtEhaGFojLwwtECSM8MLQwmG3oBB5MMJhpMNrEog4mI2aExgebOESiEjvAs2dAtptoGUVs21MYDYQq12vcYrmasRPOAzMAWjbK4hBU/awp3b4TPJGKtsvGNku0LeEF0Hpa0yX4mAdmuZrMAMFUUFcTUnMwCV1+eMRIpuTipIKqrYGhoGxxHCsc55nPImaIw6E9u2mswczLtNyZWgukVrjUGmI40plwi42F9LEq5abmGRQkuRreNM/vZ8K4xiJqq5q6qxOZYAk0wxJzg+xbTmSxdSYVXTUDsDVp3Q/3EaP00u5ttn2ma4JcUStJKXaMdKndrTdidINnWUMVWi3t91aD7WBGQGHeN9Yxli5Qzb4vvUZYqAAdMvnGNFL2oGBqCKDAoKk9gIzrvrFoysRlxuMis2hYpKFucWW+8qq5DHICoNVp3+Mw2aJqjmwrphWhWhGeIrhWhwP2+EZDaU60T3ZVnl6E0RikuZTCgoLoJ4DHCKuzWudZ5lVZ0cGjZg4aMDn2GAkOeLb7mituwJKMQ0sKcKVVqnDEq/buOsV7bGAoUahBqA1GxpTgT5xpNkcs5cwc3aVArgWpWWe0HFfMdkWlp2fZWxSekvH7aspBFcKn3wXFkjKCVTieb7UsbpQsBRmoWBrTDdnv0ivCES8ThlnjmR89oj0va2y7I0sfXrMIcVAmJqCBgDXOgz1jNbdsUgSissqr3qVKscVqWBYAkHAiK1WxSSjdxsi5HWdDNVJpYPSstgQMVGIIIINQfKNfaeTyTMb/ioPz4RlGRgqzUFCKMDnliO2NtYraJiK41Few6juOEGDEZIVTKhuR0v7Mv/F7o5F/zsdi+pCqPO+dOgA45+eAiGY28k9mPwHtjrVOtT3nzMMmUAzr5/lHOUa4R177lryOetslC6SBfJoa0FwipyAGPHEiNnyotLTcK4l1BH3AReoN1BHlaWt5bX0ZkOjKSD5Yd2MD2/ac2pn3zzodWDk46+WlMqGkbMd1RjzVerse6Spg6JAoKCozGUF2eaR1T3RluTW3EtUpTS7MugsntK7x7IuUcgjTcYbCYhxNDKtehEEq8Ucu0kZivGDJVprrGqMhLRY345WIEnViQGGIA6GmETETzIgB7NETzIGnWsCAp1rOQiWGgq0WqkVs61ExGzEw27/5irYUiJoEt08IKk9gGZjtv2mkrDNtAPfuEZm02ppjEk1J8Bw4DhGPP6hQVLkbCFk1qthb4afn7IhQamGKtM4lUanwjmOTk7Y5KhHKGWVWPOKt03luFSSMwfSFaHugG22wsbiHgzDGnAcfZ2wVseXcrTH8XjmYZBU02WSBBslkwdrnFlJQ/xJeAHbSHTNlNSqzJbj7rEjxpSL36QPvDuqPLTtiCfIXrc30vtISp7yPfDda6ocsk+5RmxTAaFfMRcWGY1264IIwrhl2xDPs8x1YJMNfRvqAQfRIZMKcCDFHatj2lq87PIHENcy0KVUd4EMg4vqUySlJU0W+2LRZGFJxUkZXcXB4UxXvwitl7ckueZtCGbLyWa1BOXPNgekuXvrAMrkvPoSplsK0qHNDuI6OIhh5NWkE/V1ot4gOnvP3TD1XcU00i6tXJNqqbO6zAwBoSARX7w6LduHZBVh5FMSOdmBa40QXjS9dzNAMa6GG8l5trsyATLOzSc5bYG4TiDgcUJph3xtaaj0XeWONL8yvip7oq9grLOqKydyJsws94c4HADXw9TUEadWndpnFPtb6RZxMWbK56Xzgmc7LFKNVG6aHqg3d9MTjGibbLmYLMwW4xVK0N6j0pjWlcRpFvYXDNMGXokEitQKE4cKHviKUWya8kephtnbVSXZpbS5N+TV0msBit1hzZKnepNYk2JbpZLJLYXakqMqZHLTAqO1WMXe0rJLkBjLUJzpl3lGClrwVqDLXGm6Mc1jaU3OquN9aUyNVU3c9Qd2sVqkCUlJmqM6FASzgQCMjiIUK1FNJkSu8xDObDAe+EzA/NfyHdEE21jIYnQDH57qwtRZsckDT2184rrbM6JXeRhrhFqdmTpmJ6ApXE1amnH2QdZtiS0BNLzDU6js8fCHe7DHy7YialPZcBvJqaRLluhoygUIzBGBj0bZe0FnAaTAOmuh3ld49keWbMtIkzKHqNn93QH4xrbMpBqpIIxBHujHLJLFkvoyKNxo26MN9R7InVcKrpjFbsq1c8hNPrF625hoR5xaWWUSRQVFa0+fnCOrimppNGaaoJsM6o3dsGM9IjmALVtTid1eEUm1NsXMFPTPgo1MaU6W4urLe0WimEVs61VrSK+RaGO8k6nP8AKJkXPXefhA1WGhMaiOFcYeVoICttuSWCWNBoBiSeA1ispJK2FInZwIo9qbXp0VOOp0HxMA27arzMB0V3antMBpK1Mc/N6u9ofyOjj6sYasa+eph1AMo67aCOKsYRg5RTE5wBbLWWJlocfSbdwHH2Ry0Wu8bikgZM404Djx9+RFksIXq0Pb858Yao1uwpWDyZaKMVI33cfGD7EARVDe0pkQeENNnBOdxtN0SyTcNJgIrhWnRMFDCe+Rx4HMfO6HSpit1WoRmCMYITHOh4/ONPKGvIVsMjpX3HWCyI7Th4Y18MfbClEDI9x+IiKXJmId47fmvnBfOjC8veMx7/AAipYgeyLW8FIOdVNDXjTrd4iIS3x6QcEiofotQAgC8opTHKnfFiJQPSQ+GI8NIUpScaqTkRru798XUmgDG2solqk1Gl0K3q4oFRlNb4wxUZHGCUtaFMG60ybO16jCYAa5Zuo34xE0ugyK8NIY+zZLVN0y2IoWTCuXWAwYYDMQ1Zb5Ke3EFt0l1miYqEjok0+0oFaa1qD4RcbQmJ9cbwAqrhq03ocd4pAFql2hV6LJOUGuPRfEmuWBz3CK+y7QVFmLOQy6kkBx0SCx9Lq65ViKugdKYPL2eFWY6TTMDlCAzFihRul0iakEMD45xUi3EqqE+khz+6o7YurRYZUisyRgJoF5QeiKfZGnWgCTIqSCKio8gpEFyBo6omezzKm4yhcwDxxPnWFBkKILozNm2Kz4MSx0RR7h7Y1ewuTRoC6CUCaGgqzdh3YflGoEhJIcIlAGoaajBqk5nPWCbuBOlcO7d3Ql2+R3BjOU+yFkXSim4AUNak1FCKtxBGQGRilNS9QMDlujcbeV5rKqy2KioJoaFhWlK6UqK/eimfk/NIWihQuIq2lMBhWETjb2Lozdq2atMuI9498Gcm7ZUmSxxUdE71HvHspEkw1BGprTg3GKKZeRw6dZTUDiMCOylRAj81pYJKt0eg7MtRkzVcZZMN6nP49oEb2Xgt44Vxpw0rxjA8mpiWh5R9EmpG4qCSD3ikajam0gARWN/+ntxhLVwjJnVtUDbd2ndHHQRQbNktNmGZMxIyHH8t8D220kteIqPPti02LaUK0Vsdd8Oh6iGSdWVcHGJZypVPefhw9sNaYADA1rt1zBVLMcgPaScAPnGKiYZjVvt/CvV7zm3kOEXyZ4w2KqNk1u2togqRr6I+PdFDPZmJLEknU/OAiwnJhATiOdmyynyOjFIhUfOkcNTl4/CH3a9kKY4UVOAhFFxhUCKyfaDNNyWaDVt/BT7/AA3wydNaf1cJe/7fwXjr2ZmSLMD1cDu7Ps74co6d3ySKsfZrCVTdTIbu3dwhrSVJ1RsqjCC7LOPVNAQaY4eHzSDnsoYUI7GGnaPnugWxtAkkYANjTDH2gjEQbLlmlAQw+ywH/gwMBMlEBlvIdRl+UGymXu3aePontwi1EB5llOadE7jkfh84xIDo6mp+cDr31ggtTA4jsow+I4iJJN09UgjccREIRWVDQlDXgTj8fbD1cHAih3RM1mU5dEjj7DpHXBpSYt4aNr5Z90QhFzNOkDlmRn3/AJw5xXB1r5H58IcZFcUNRkcaEDWo18BEofRlqPnQ+6DRLGBiowaoAyO757YdMcDOWab1xA7d0KZIB6rdzCvgcx31hUK5grxGI+IiUAhtDoym4wJWmBwI74gSacm8CPmsF2sC4xIGWDDCK6zzajCh4fkcIgGVm2bJKwugy61rcNAcswMPKK+y84hN0hxXXA5Dui524oKA5EEeBwyPdFJIJq1N+nYIEpNMvEKNtOqOOFIUWlkIKAkY8a7+BhRZamiOUTbzJdQ1dQte0Gh90RFyyU3MR5woUBEJFNVodR4EZGI5FShrxw4x2FEAYLbKBJ5AybpDhU/EHyistqAkMN90+sIUKM7VS2L9DuwtomTPCgkK9MRmr5A9+UbBmLZmsdhQMjdIU1uDzEgPmrpBGhrChQpckL0NVFyFQDgKZwORChRtQkFtEAssKFC5FkQznCisZ/njaW/5eYH2+J3DcPHgoUMxrZsi3dFzY7LgSMFyPaOG72+18zom63zoCDHYUB8jlwOnWcMAa4nANrwDD3iJrNPKCjHLCudO3ePOFCgrghaSGrhkSK0zUj57O+IZ9hNb0vAjG7vHA6jthQohDsqZpTu07tx7IJs0oNUp+fwPlChQSDpU05GldNx7NRBKHd4H5oY5CiMA3o3qdVuGWNfDIw9jTBgDx1hQohBryVN2lM8K6GhOB7vOHhmU08jp3woUWAR26bLCNeBGGkUCydRpqMCO4+4woUQDAdq2shCpxDCoPEGuXdFRZpoNe33CFCik+Gww5NHYGPNrjv8AaYUKFBi9kLk92f/Z",
    },
    {
      id: 2,
      name: "Avari Lahore",
      location: "Mall Road, Lahore",
      price: 110,
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/205124707.jpg",
    },
  ],
};

const destinations = ["Islamabad", "Lahore"];

export default function HotelSearchBar() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  // ✅ Multi-room guest states
  const [showPopup, setShowPopup] = useState(false);
  const [rooms, setRooms] = useState([
    { adults: 2, children: 0, childrenAges: [] },
  ]);

  // Popup Handlers
  const handlePopupToggle = () => setShowPopup(!showPopup);

  const updateCount = (roomIndex, type, operation) => {
    setRooms((prevRooms) =>
      prevRooms.map((room, i) => {
        if (i !== roomIndex) return room;
        const updatedRoom = { ...room };
        if (operation === "increment") updatedRoom[type] += 1;
        if (operation === "decrement" && updatedRoom[type] > 0)
          updatedRoom[type] -= 1;

        // Maintain children ages array
        if (type === "children") {
          if (updatedRoom[type] > updatedRoom.childrenAges.length) {
            updatedRoom.childrenAges = [...updatedRoom.childrenAges, null];
          } else {
            updatedRoom.childrenAges = updatedRoom.childrenAges.slice(
              0,
              updatedRoom[type]
            );
          }
        }
        return updatedRoom;
      })
    );
  };

  const handleChildAgeChange = (roomIndex, childIndex, age) => {
    setRooms((prevRooms) => {
      const updatedRooms = [...prevRooms];
      updatedRooms[roomIndex].childrenAges[childIndex] = age;
      return updatedRooms;
    });
  };

  const addRoom = () =>
    setRooms([...rooms, { adults: 2, children: 0, childrenAges: [] }]);
  const deleteRoom = (roomIndex) =>
    setRooms(rooms.filter((_, i) => i !== roomIndex));

  const getSummary = () => {
    let totalRooms = rooms.length;
    let totalAdults = rooms.reduce((sum, r) => sum + r.adults, 0);
    let totalChildren = rooms.reduce((sum, r) => sum + r.children, 0);
    return `${totalRooms} Room${totalRooms > 1 ? "s" : ""}, ${totalAdults} Adults${
      totalChildren > 0 ? `, ${totalChildren} Children` : ""
    }`;
  };

  // ✅ Search Handler
  const handleSearch = () => {
    if (!destination) {
      alert("Please enter a destination!");
      return;
    }

    // Filter hotels by destination
    const results = hotelsData[destination] || [];

    // Navigate to results page with filtered hotels
    router.push(
      `/results?destination=${destination}&from=${checkInDate?.toISOString()}&to=${checkOutDate?.toISOString()}&rooms=${encodeURIComponent(
        JSON.stringify(rooms)
      )}&results=${encodeURIComponent(JSON.stringify(results))}`
    );
  };

  return (
    <div>
      {/* 🔹 Search Bar */}
      <div className="search-bar">
        {/* Destination */}
        <div className="search-box">
          <FaMapMarkerAlt className="icon" />
          <input
            type="text"
            placeholder="Enter destination"
            list="destinations"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <datalist id="destinations">
            {destinations.map((place, i) => (
              <option key={i} value={place} />
            ))}
          </datalist>
        </div>

        {/* Dates */}
        <div className="search-box date-box">
          <FaCalendarAlt className="icon" />
          <DatePicker
            selected={checkInDate}
            onChange={(date) => setCheckInDate(date)}
            selectsStart
            startDate={checkInDate}
            endDate={checkOutDate}
            placeholderText="Check-in"
          />
          <DatePicker
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            selectsEnd
            startDate={checkInDate}
            endDate={checkOutDate}
            minDate={checkInDate}
            placeholderText="Check-out"
          />
        </div>

        {/* Guests */}
        <div className="search-box" onClick={handlePopupToggle}>
          <FaUsers className="icon" />
          <input
            type="text"
            placeholder="1 Room, 2 Adults"
            value={getSummary()}
            readOnly
          />
        </div>

        {/* Search Button */}
        <button className="search-btn" onClick={handleSearch}>
          <FaSearch /> Search Hotels
        </button>
      </div>

      {/* 🔹 Multi-room Guests Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="pop-top">
              <div className="title">
                <p>Configuring Rooms</p>
              </div>
            </div>
            <hr />
            {rooms.map((room, roomIndex) => (
              <div key={roomIndex} className="room-section">
                <div className="room-header">
                  <h3>Room {roomIndex + 1}</h3>
                  {roomIndex > 0 && (
                    <button
                      className="delete-room-btn"
                      onClick={() => deleteRoom(roomIndex)}
                    >
                      <FaTrash /> Remove
                    </button>
                  )}
                </div>

                {/* Adults */}
                <div className="counter">
                  <label>Adults</label>
                  <button
                    onClick={() => updateCount(roomIndex, "adults", "decrement")}
                  >
                    <FaMinus />
                  </button>
                  <span>{room.adults}</span>
                  <button
                    onClick={() => updateCount(roomIndex, "adults", "increment")}
                  >
                    <FaPlus />
                  </button>
                </div>

                {/* Children */}
                <div className="counter">
                  <label>Children</label>
                  <button
                    onClick={() =>
                      updateCount(roomIndex, "children", "decrement")
                    }
                  >
                    <FaMinus />
                  </button>
                  <span>{room.children}</span>
                  <button
                    onClick={() =>
                      updateCount(roomIndex, "children", "increment")
                    }
                  >
                    <FaPlus />
                  </button>
                </div>

                {/* Children Ages */}
                {room.children > 0 && (
                  <div className="children-ages">
                    {room.childrenAges.map((age, childIndex) => (
                      <div key={childIndex} className="child-age">
                        <label>Child {childIndex + 1} Age:</label>
                        <select
                          value={age || ""}
                          onChange={(e) =>
                            handleChildAgeChange(
                              roomIndex,
                              childIndex,
                              e.target.value
                            )
                          }
                        >
                          <option value="">Select Age</option>
                          {Array.from({ length: 16 }, (_, i) => i + 1).map(
                            (num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button className="add-room-btn" onClick={addRoom}>
              + Add Room
            </button>
            <button className="close-btn" onClick={() => setShowPopup(false)}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
