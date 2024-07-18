import { useEffect, useState, useContext, useRef, createContext } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import ModalPopulate from "../components/modal";

import { Typography, CardActionArea, CardMedia, CardContent, Card, Grid } from "@mui/material";
import AccountMenu from "../components/newHeader";

function Home() {
  const [readyData, setReadyData] = useState([]);
  let allMexicanBorders = [];
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('email')

  useEffect(() => {
    fetch("http://localhost:5000/borderdata")
      .then((response) => response.json())
      .then((data) => {
        setReadyData(data);
      })
      .catch((err) => console.log(err));
  }, [setReadyData]);

  const loadBorderInfo = (information) => {
    allMexicanBorders = [];
    for (const item in information.allMexicanPorts) {
      let currBorder = information.allMexicanPorts[item];
      allMexicanBorders.push(
        <Grid md={3} wrap="wrap" padding={2}>
          <Card
            md={{ maxWidth: 300, maxHeight: 300 }}
            key={item}
            onClick={() => crossingClick(item, userId)}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="250"
                image="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMVFhUXGB0ZGRgYFxgdHhkdHx4gGiAdHR4aHiggHRwmHh4fITEhJSkrLi4uHh8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgA/AMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQADBgIBB//EAEsQAAICAAQEBAMFBAUICAcAAAECAxEABBIhBSIxQQYTUWEycYEUI0JSkWJyobEzQ4LB0RUWJFNjk7LwJTSis9LT4fEHRFRkg5LC/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APs8mdAs6Xod9P8Ajv8AwwDwyemlij0lVNgMSCoa7WtJ2DA17EDtgzMyoSq6lJ1jaxfc9McZwaZYpKBHNGd6PNpIPTfdem3XAdtmWBKlDemxpN+3evb9cex5WwNRY7CxqNXiO6q5ZiAAlkk0AAd8VjiBb+jikb0LDQvztt6+QOA7OWKG4govqpsA+9gGjXt6YCz3FkgYyTho0KhdRFrdt1Zbq7AF1ZOCNeY1BfuRYJOzmvbqL69dscS8PGkvIfMf1I2UE1Sr0UUfme5OAVx5qXL2NAjy7yFlkkomJnJYhgjEaCx2csKuiKo4OE80UjITCwbmUlmj7Cx0cHff649m4W0YP2fSUN6su/8ARtfXQd/LJ9N1/ZBJOFPCc6q5lcswYLpfy1krXFsLiYE2ycpZHBYEArfKLDRebP8A6qP/AHrf+XjiXNzKCTCCBvyyA/zUYuAdFHRwOwBBr233PtgbiOYLqViYatOo1vy+m3c/47YAWHiEvMwjQBn2JZm1bAbaFII29e2Os7mpQqP50axlwrlV3UHbq5I2artel+mKmleI+YYDp0kCiTpAFlmsXZ6dOw9awBwyWEp5jRyJJvfLbMSBq2YEMSxrpfQemA78b5VUyM7NK7MqhuaSrpg3wilrb0xoDxSAdZov94v+OM7xDIxNlMwhiAeWJ1UrHq/qyFIZQRe11e3Ttu94GySZeGQBTrjRrod1BwFOdzkMopSzldw8KltB9Qygi9+m9i7BGOMhxwMCHWQsrFWKwy0a6GtO1ijXv3w5C4DzGVbX5kRAYimVr0vXS63Uj8w+oNCgXZnOJrDIkoYKTflSCzY68u4Py/lizLcVJYlYJiHOxIRSCAAQQ7Ajpf0OC+GzBw0pFWdNHtpNEf8A7at++O82i/GANSm72sgdR+l4DvJ5sPq2Ksp0srVYNWOhIogggg/34ReLIhOyZJCQ04++I7ZdSNd9ua/LH7x9DhhxJ1jRs0JVjUR27EalKLzA1Y3AuqPfvtS7wxyo+anYHMZiiVGnUqCxFEAD1ANn9pnwDmFmTk0agoFEEA6dwBWwsVX6Y9ilDS9Dsm1gjqd+o+WLMurEszCroAXdAX17XZPriuaQrKKUtagbdt+vp/7YA3ExMTALuJrUkL6iu5jJB/ONuv7SqPriwxGNteosDSsDXS6BFAdCf0wRmsuJFKN0Ir3HuD2IO4PY4EybGSIqx5xqRv3htf1FMPYjAMMTFWWk1KD6jf2Pcfri3ATCPxlMBlJU6tIvlqPdyIwfkCww8xnvEpqGaQ7+W8Uh2/AjpIf5McBoBj3HmJeACzaxxxNqJCqC12bvrYN2WvAWWy/2geY4dVKroGtgQRZ1EI1A2R77YJyGSjJMhGtixp3AJABoaTWwr09b74HiDIssepgyWy0RRV2YpVjseX6YDxuHcqy6mbSt6Xd2UkUR1PqO4PywyAl/Y/Rv53irONoTQATynexsBW5s++CppQo6E2aAHc4AVZWDguoW1IHNe/X0H/Ppi7PH7s/T+Yxyxdv6ta9Gb+dAjAiZbV5i3pIIpAxK/msjbY3VexwDGSZQLJFYUcey0cyAqVE8Z1wufwuOgvsrbqR3DEYZZVUYB1VQSL2A2PcX69sV0ZRZICX0F2wBI69geu2AH4fxL7TGjR2oI5/VCNmjvprBBB9K9xjuCLy5tIoKVZlFdyV1b999/rhOma+y5x4UAMcyGVVF8kkelZBtfxKyNXWw53vBUufaQIyvGncbmzaE1v0HzG9dMA1zp3jXrqff5AFt/awP1wPxXh4cowJVg4Nj1oqDXci/qMVCUJ5b+XpJFMWvbVRsuAbF98dPERKtsSTRO7VsTdLdVuNsAK+U1tHqMYvVdR/j6b0wuxqqxX8MB+BZmXJwx7ssKGE7AH7p3hJ3PrGP1xopskjdRXrpJX36j3F3jK8NzMEGczGTklKO7CaK2YallslNzp1CRXNdSCDvvQajK8QR20rf129D069/TA/E+OwwMEYs0hFiONGkevzaUBIX3O2M5xDNS+c2XyzUqGpczQJi1LXlrtpMtAEXYArULKhtJwLhkEKfc76+Z5CdTyGvidzuxr1wCJvEmSSTU0yiN7LJIGQxN3Yo4BCmt7Gx3/Exw1y/Hsi7hEngLsaUaltjV0L6mhde2HDxg7EA3sbHbGcz8UelsrNH50VrRKGStwdBFEkqNw4GwqyCLIBcaZp85Dk4iDCjCfMCzRrmjjsA7F6kYeyg7Pg+fxBI0rQ5bLCeSOvMbzVWOMnopfSSZK30hdhV1YvN+CfDWRn8+fyBoaZlQEuKVTpHfoVVW+uPoGQyUcKCOFEjQdFRQAO/Qe++AUHi+cUc3D3Y/wCznhb/AIymBcrnOISszrBloxQAWSWRmG7dSiaQ224Fgep641GKMj8A+Z/4jgAOCcWeR5YZoxFPFpLKr6lZGvTIhoHSaYUQCCrDfqW+EXiPJyKRm8uCZolIKD+vju2jPbV+JD2bboxtrw/OxzRrLEwZHFqw7j+49iDuMARgCAVmJQOjIj/XmU/qFX9MH4Xy8uYQ9pEKf2lOofqC/wCmAuTkevwtZHs25I+R6/Q4KxTmoyy7dQQR8wb/APT646gk1KG9f4YDs4ReIIWfK5shqJhlSqBFBWA+u9/XD7CLi+a8vLyrWqR2aJE/O8l6B8qIJPYAntgDciJGiQ6xuin4N+g/ar+GCBk07qCfVtyfqce5GDRGiE2VVVv1oAYvwGHgz3EYl+8SNwCRQLxUo2ADHzUPT8TJjxvEfMHky+bUeW2o6UlXZ4zsYGYmt+3fGvyQADAbAO1D64DbJpJmGYovIuksNmYtpbqN6AUd+p9twoXjeXnXVDNHIuhwSpujy7Guh9jg3MZ1Doo3zLsASd/phNnfDCSfex/dzLrVZU5ZBvQBYCnXb4XDA/xwMnHJYHSPPRhdTxouYShEx6DUGNxsT2BZenNvgNQM8l0dQqhujDr07Y4ZizqUXpYLNt+nc/pWOZfib96L/iGA/EOck1RZaBtMsxPPQPlRrWuSj1O6qLFamF+mAMywkt/g+PcUfyqet/3Y8yzSCIHk2B9e2EsvhKNnozZprF2c1mF3GxP3cij07Y9yfh9gpAz+aUanGnXE1cx7yRs36k4DjxRkSqwZnmcQSmWVBe8bqySUo3IUPr073p74Z5WaMqhQXGWOmlOko4NEbVRsV88Lsr4dkZFP+UM0bH5o/wD+Uwh4TwNkkfJNnM4ohZTEVkVQ0LbAC02aNzpNdih70Ab8Vz+Zd2hySJIqMEaSRqSNzfLspMrLttsASAST0UZngcZe8wZczIKA+0BNKdSVVE0qiHre52AJPLjR8Ly/kxDKINwvKWqgas7g2TfML3Nk9jV2bkK1ICGMi6GQqL69gK2BJU2aFgnpgFDcBy6NpTzMuQAwELyITZI+FJdL9O6nGSz/AAKKeXiKXNPIMshWSU8wapdJokKCHAoACrBC73j6Hk4nLkfEwGmS29N1LMN2NH4Vobn0wLLlgnEomYj7zLPsBpUGJ0K/prbqe/bAF+GM1lhlIBAF0GMHTGpNWOYkdfiu73u++GhhDfeRkAkdR0b5jv8APrjN+EMyoykLRuhLNIHF3zl3cgBe4awPb5Yd5cSIWkYDS1Wo2P79WaNdRfQA9bGAZJdb1fesIfE/FfsmXzLgEkRs6UL5iKANftEfrh/jI+PMmcw+UywJqaYayD0ji++b52VVfrgCfC+Uiy+UgiZDYRQSYmO9X+X6fTDDh+dILIVbQjEatJGkdRd9RRG4G3f1wS+TawfNYlTdMFo7Eb6QDtfr+uBzlm82nYlZASQp0gaaHbmNgje+vz2AzMRawCp6bjc0fnX8Dirhco0BSCrC9jv0YjY9/wDm8WZDK+WpW+UHlFdB6YCzc8aujgAUzEsx0j4SOp2/TANsZrisf2KT7XHtAzf6Ul8qg/14HZlNa/VSSd1GGa5uWTaOPQP9Y/T+yuzMfnQ9z0xPKn1FPNRhpu3jsmyRvpZR/DAMUYEAg2DuCO+BOLREx6l+NCHX3K71/aFr9cZ3h0cuSl+yl40gka8u3ltpVm3aD4+Xm5kHcEqPhGHOfzEkKGSSeJVH+yYkk7AACSyxOwA3JwBjZkFFKUddafSiLs+1b4ugj0qF9ABjFcDizE8suuWTLxrIypHGqK4LKkpLltdXeyqRp3Fns/8A82cub8zzZb6+bNK4P9ktp/QYA7iXEFhWyGYm9KqN2IF0O3bqcKfD0JnY5uajIHkjRQeSMI7R2v5mNG3O+9Chti9vCeTI0/Z0qiK3rfrtdYFyHhPLeUoCNHdsfJkkiHNvuI2APXuMA+kzaixdkdQATXzrpjlc0TuI3I7HlH8CwOFa8EmQVFnJQPyyJE4/gqt/2sQJxBAFAyklD4iZY/8AsgP+ur6YA/KZVCu6j4m7ftHHPD0USzBQALTp+7X92LFm0RO9Xp1mvWiT/dicJg0Riwuoksa9WJbrQvrV4C45RCb0jf2wLmeHxMyq0aspDAgqCD06g4YYozCG1ZaJHYmrB9+3r9MBmZvD7QyacnM8IJVhE6mWGgd6DHVGB2COoG2xG2EnF+NyxZ5ftULx1AqmSEGWNVaa2Zjo1Ip0D4gOnU43qM3mDUoHKfxX3HthXCf+lJR/9pF/3s3+GAnBuJRuqSLMJlIKKyFWDEMBsUHcb12F9hgrLZiL4WWmLH4kO9s1b1W9euAeJeDss7maMNl5tz5kNKSaq2Ugo5ruynCHh2bzCGOLNkVIYvJlRQqygkko1k6JQCRVjUNweoAaNs2ImOgDdmDbNV2SNIA5mr8I3oj2GE/GVaRPtMRlkkhltAqKPMU6UkjBr8VWL21Knps0y+WKylRGVjLUdxYsK1DfoxJBPX9ducxB5YkCtpYEMVD0LZrDKDYU2Phr3v1DzKZ2OZAYWIjkAkRiDr1d9C9SwIttXQ3YI6SLc1ICisCJhdc1D4m673dLQqtzRxnp82uQmlZ1IglYtqB5oJWosx20iFmpiw2VmaxTXh7mnDBZZdMrXRiXdCKJBA/H1DBm2onYYAjL5ln/AKACoyUaWtnXryL+Jt7vpd1d1hDxXLwnN5Mvqlb76MO4LamKiVWANLt5RBCgAb40OTmaNhHpJKjS24oiiwNnqw6Htv1wg8aIQ+WnCkf6RAa1VpDOIieU7FlkIv8Ae9cBXwDLxrFOnkXLBMxjYKUJWWp0FjmrnMe3UqdsajJ8Nk8qjmJLYWfhZRe9DUCxA6XdnGV4nnhkM1HmSA0cp+zyrzM1xh2SRQv4tJIYV03sVg2bxVlHjj/0jToZVkj1SRMysfKBW9LMFYqdr2vvWAfZubMroUJE/MOYOydLO66TXSupxkslJP8AbfNMYPkacryP8TNpklbcAG/uxvVFTvvjScay+ThgklaNKiUvSGmNDYArzEnp364XcD4cYIEibX5qqHkCtY8yR9bHmJrmBABPSsBon4iwr7iXc1/V/wDjwizXFvMlUiN306gyKLACsRzFX0qT15q+HDTPZHUFaV3I1jkBsdxuAObr6V8+uB4oB92i69JkYuLZKW2IFAAb7WPQH1GANgyUpHPKyre0aHcD0MnxH+zVdLOPYuGRJKhVBYVqJtjdjuxJ9cM8CZ8kaWFbNRvpR5e3uRgOpgS6jUQCCdq7V7e+O4YApJtiTtubxyiOWBbSAAehPevUYB43xoQ6Y0QzZiS/LhU0WrqzHfRGNrcjawBZIBDzxPPAITHMpkEvIsSXrkY9AlEEMOuqxprUSALCHwvDOMwycQIkmhiR4W1AqsbalYkAAecCtM9bgjTQJGHOU4YY2XMSt5s5sO4BpVP4I130oCF9zVm8J864aXiZ5wxy6IraW5UMchB6bc5Yk+w9MAz4AGaA5muaaQzqB3Q8qD5mEL9Th9G4IBG4O4xRwxw0MZXoUUj5UKx7Eulyo6Eaq9De9fPrgCcBoxiAVt06Bu49NXt2v/3wZjiWMMCp6EUcB3hXn+NJG+itRHWgxo9aOkGjVH6jBcMhB0P6bN+b5+jD+PX1AEyj881H+sH/AHaYCvMZjTE66ozyvuX3PU7iuuC8k8nlpsvwr+I+g/Zxfml5G/dP8sc8P/oo/wBxf5DAV+fJWoqtAkEAkmg1Ejb61ixs4g7/AMD/AIY4im0sIyCCS5B2oi77fMYJkSwR6isBU39Iv7rfzGEnFXEOfy0u/wB8kkLgAmwo85TQBNqQ4/tnB0cLFluV/wAY/B2YAfhwB4kh0tlJNbEpmkFmtg6tGegGx1V+mAIzGZMsvlsJVjCBqBCl7JG9HWAAvQUd9/TFHGWy80TROB5ax6grKygn8FWB0r9SPTFvF2QzRFWQsQykF6AUc2vbur6R/bOArGgIJEUGJf6wt0I9x64BXJN9jLrIZM1lwyMsmppJYtxyut3IoA2dQW6WD8WGP+VkkRjlUWVJNDiQbKoYAAnVRb4TyrZsEHT1wNxTLJmJ1y7vGUjUTTW2oN1WNKJvmKsSLqkA74VcU4RJFqlglVoLVpsshALCtTtDqPKTqJMd0TZG/UGnEc7Ll3WJMuJcxO2sanSMaIymos24VQzABACbb5nCWXgnEIdTxSBYtZDwxwArEuk7xgzWVBbUUHS20i9ifxzP5eVsrmstI0gJeBgLakdS7KwYWkgeFdjRFGxjWosjLKLQWSOhPVF9xgMlk8hmMwjOvEC+9owyxPVBYJV+u+kg7isLfFPBpXgnd87KwSF5aMSIFaIalB8zUSA3ZaNj4hh/HHMJDNA0aSMFMilJNEorSbWx94D0YEHoDY6AeL2zgyuZYtlWSTLSlisEt0EKk20tKaIBv222OAXZ/KTxjK5gZxm+8jeykFqJh5BvREt/GNiK2HUi8PjwXMsjscyxprH3eX2ND1ix5xPhrSZOeuWQQB4lIQKSKlX1J+8X12wwySwzQl0kUiRVdSRECQyK43r3wGe49wjMTZvL5P7XIT/Ty8uX5ERgUbaHqZlFA9dLemHx4JnYmIhzSyqxUk5mNSwIOom4fLv0qv5YV+HM0zTTZtACsoqMHSSYlpUOz/jbWw26MvvjaPmWBA8s2brmXt/z/LAZ7i2Z4hBH5znKSLGdZRUmVmABJAJZgDXqDhxBnvM8uXQ6oVvU1bagK2BJ+Z7YWeN5ZDkswiqNbROqqCSxLKyCqFXZ2wXwniAly8ZTRoaMb8zDpVVpHpR+uAeYA4wToKg6dQNmug7nfF+XlUBU1Emq3BF0MTOrHWqTTQ7tVD9cAp43x0xQK0SCSeTSsSXsXfpZ9Bux9lY4v8P8KWJfMJMk8gBkmYcz9wP2UF7INh+pxnODyRZvOSSo8BigYxwjY65GAMjjm30io1I6c4+Wx4ctIBtsSNhQ2JGAJxm8il8Szqnoctlb+rZkfyxpMZ3xPG8N5+I80MTebGek0S85F/hkWiVbpzMCKNgCvB5/0LLr+SMRn5x/dn+K4PzHKyv2+E/I9D+tfqcLfCuyTLfTMSkewkbzgP0fDmRAQQeh64DrExRkmtBvfWj6gGgfqMX4ALicCsoLqrBWBIYAiuhNH0BJwRBAqDSiqo9FAA/QY8zguN/3T/LHcZ2HywC6ecyZN36FoWO1/lO47++C48olDl7epwHk2KBsu4UkKWX0dSTex6VYBG/UetY74VKwhjBRzyA3ynqL/NeA5zGVTz4tu0nc/s4uzsEarZFDUtmz+YDFOZnPnQnQ/R/T0Hvi3O5g0BocEstVovYg9z6An5A4AKBoNQ+HrJ6/mwD4rWExRaQt/acv0H+2T+7Ba5hlYX5o/pT/AFXQMMLOKSyTZnywJTHldMri4uaU7xp8lFub7lPTANeMuUlg0ui/EgXTvujN69LQbV1GBcxKQFtiR5alT5d2NS2Ngd6xY7t5kNmUurkOQsdWIn6UK/Fi/KZXzKDNJSxpVhB1snovsMAsyOXZuI5gqx5YssTqRR3zHbSD39R9cOZXdPN36b8sd/hFdz3HphTk8sF4jmw3mvcGWN23XVmL+GgMO8nlbt1Z0DVQu9h3OsGr9PlgPn8/h2PN53NzLJKk0bRJHKlLQdSragF0tsxFkE4Yjjk2UZ/tjNoEiqZ0QaACqgCVNyhrfWtoa6r0xZkXZM3xC2ahLBuQfQeiVg1pRIJSfvNElKQz/lUVtHVb7gn+7AWRykc4mbSVu9GxGsKDqXqNNb98V8aVSHCysQ0MupRrF7AbWSL/AJ/PGXzUH2TUvOMsRoYkhRCzvzOLsmI2SQT92d/h3DR/FMG4VZ5iqyqxiy5nCmwN3iBFUOt/PAdeHc6AseVlZWeAmK3dreMgiNxte4UIf2lOFDZsx8OeBCRplGUJDSCkXM/Z2IoUPuitdwCpxXxrxAB5E4hzdwMusnKTJcD0ZAdagHS4Vx8hXU2q4vxKMJmklE0Qmz0UiCWB11JcRYjUtA3E5I9PmcB9NyCRjRysEokUZSAF0hRVCqCj9MGZB6KEiQsYtyQx3seuE/C+O5aQlEzW9S0pCJYsHlDIL29OmGMeZpguqRzoGlUCWRSk7gAKN+pI64AvMZj7ygr76PwnsWb+7CPgHEVin4hGFfkzAZYlAJUPBE7HY6VDOXNkgElsdcVtEWQ/0kjL5cKPTOeh1StzBQpJYqBpF9e+e4vwUoftOZlhYKYhLl4bSJ4mdlKtTapWXVqttmojSATgHWa8RNNJ5cSvMVeiuXI0DlO0mYNKp9VTm+eCIfC8sx1Zl0jH+qy99K6NM48xu/w6MMsvl40YCKHQiutUNIFjTsv/AKYdDAAZfKxKrQ6EEYrShA0gUNgOlbHFDhYDqi0+X+ONa2/aQevqvfqN/inEJNLuaQ0imm071q9Tjqd+lRKNLKbsd/p6E4C5OLwt8Egfa/u7f/hBrHk2aLgqIHYMKOrSqkHajqOqv7Jwl/zky8TBHzOXRtFaA+t+Vq+Bd+57dsW5XxBPMP8AR8qzhSQZJi0CGiRyBlZ22o3pA3G5wGX4OHyksvkSMR9sSB4GLOq6o41TTKwDbDT1vbYdLxuJg0iKS9amUFQFob7q2oE3sR/Ct8Y+HLZ6bKSS6MpGJJGzQdnkLKVbVGdkUEBUQXe6/PBuXTiEirI2YhjEnlSGJcqxcEgErzzEal2J5e3bfAbHKyEjf4gaPzH+Io/XFxbGby3h7MMWabP5ghq5UEMdV+0kYa/r+tYuHgzJEU8AmvvO7zH9ZWavkMA2z0wEbGwNup7DufoN8drMgFal29xhKvgfho6ZDK/7mP8Awx6PBmQGwysIHoEFYBHx3jWfY6V4W6rY0TNPEWDHlsJHqrr3NEWDicP8TZ5Yl1ZAgDlFeY16TpukjJF10xpUczTkW4ji0/hoGQEkjcWaGk7bYtyJ8tzCehLPGfUE2yn3Ut9QR6HAZOTxPnC6t9hkGgmvu8zzBgBf9FtW/wA8d5rxZmNJL5F9I33izX/k43WFPGcwFI6atJ0A9L23o7GgCf4d8Bi8pxTNTOQuShQITbSySLzNqYroaEkgAi26bj6B8MzOads8yxZZz54BKysQAIYqAK5drXcm9t79LO1gnj0fcnn7qv8AWj1U+v7Q6dDVbZrgsiR5nPRAsobQ4I0jdkVNNEajpKEaj11X74D3MzZ7WoGVywPnMRT5gWfKY/6kDpvgzhGa4rp1JlMoAVX4p5l7H80V4cZdBLmHAkJjjYORuCX06a6A6VG5rrqX0Nv0UAUNgMBgYeI8TTOzE5TKs7QQmhmJAAFabfV5J/MetVQ63sbleP8AENC/6HlR8K0c64IJF7j7PsfbHudzkLZvM/fqAuXh6EHcNOSD/A1gzNcURSW86I88dXy3dCwQfS9qwGRhzfEJZs7oy+VuQZdmH2luUG9NXBze+wr3wcM7n+ZWysTksLJzZpT0/wDpdI+HtWO1zccmZ1qEJ+ygWGN3HLagkLd0T09ThxPHZcvIo0kEAh+hqiTsDVnt6YDKeIMxnBBmHfh8Xlojlm+0oaBUkMAcuCavbp06jqK+FTeTlYA2TniaKNYkYZdZBIGA1W8TlSCbO9Wd+uDvGWbLZfMgSamYBPieiG1rW1LW42PcYb8Q4zl0HlaRGwq2D6R2BPLQJ3P9+AyPGuKpPl50SDMFnicAjLMNOqBB3I25T/Mb0ccZnjeXkOSlLJGrOHp2jBUGDMizS3sWAsj+eBfFfEI1gmC5kEuAFubSxAsHYE1SAi/2hgHwhHAkhYQeU70Yoswgby4Ku0cjd2ckXsVsWTtYa3ifHMo8REgMylq0/ZZ2vUyD8S0buhuOw3vC7h3icZRp44llj1xxtHGYXVIXYsGUHS+mBQQ23U66G9Yd8Sz9ZnLQEGOmM8pW3QBeVAF7apKAA7Ie+GUWls+6tpF5SAAmiDzZimF9RgFGS4pkYrkl4lBLmTG8ZaVgnlg6aSOJyPLX1J3NWbra7jfG8jJFmUTiOU1NFSXJD8SgMnRh+In/AJGNQiQuImKxFjKeyk76jWHP2dPyr+gwGIy/jOKVVeEvmGkWJgkMLnmuypdiI0bsdRFHDryuITi2ePJqfwoBNLXbnao1b20OPc9cD+GcoyvnYlKiJc2CoqquOKVqrbdy3bqScaLM7lVvYk37gC6wGQ4jwXiBVzBni6jbTIiLI4F2BMi0gskA+WTt1wq4bkcpMkyyQFZkRdUc2YaQ/DYancoytWzCx1HUEY+jyRchVaXYgbbD6YzviOCHyDmfMOXlyyMRKgBZBW6Mv40Ygch6kAijRwFfCYo4AiRKiKpIGlIwTahvwkDv2GL+MZ1kycjBmDzNoTbmBdhEKFfEBbVXY+mMpks/xBlsxwQMKtdcszAlVStKsossQOpFnuN8aHw3wZ0Y5jNSebKlhQsYVEZ6LlF0hixsLbEnrVajgL+MEfZEhhTTGzRQLqFAKXVCNJ3oAEUaw64fCBqbqWY7n0HLQ9Bt0wt40pEcN7M2aiIX/wDKGr3IAJPyOG+V21L6Mf4839+AIxMTEwExS+aQEgsLHXF2EsubjVmLRqdRJs10HL3H7OAuyMVvMCzBvMugexAo16GuvqD748zOVZtRVmLxuGQEirCg0dujWVJ9Dip0n+0rzxi4m6Ix6Mlfj/aOCk4e+5M8nMbOkRqOgH5Se3rgCcpmlkFi9tiCKKn0I7HAWezfMmnszCyBp2BBG7LfzHpiz/I0JJLKzFuup3N1t3NYB4jweGNEeONEMbqbVF+EnQ3UdlJPtWAzfFOP5eKV0lzMCgsGYNIqtbWKAElkAb1tRJJu9l+V8QQvmsy6SvoYQxBostNI6hU8wMBGjKDZI3FbdCMfQUyVSNpdlJVboJvu3quE/HMhJBL9ugXzpAnlyxsaaVQbXQQKEi2wAIAbWQSNjgK4OORGKILk803ZdMLJRo3RlZSL3O5373gHPcYzLkqmUnEQALGSWIGhdgU5rpud6rp3wfwzxTk51VI8zGJDJYRmVZFtroo+4YaqIr1wVJF9+2gl7TmIJA3ur8sAX898BjYMxmRLKq5SC2y0atqkblozbgpC2snfqew33NGR5XNsUo5daKizBPIbBMV/Gg7+nUdMWwPeaYXR+zgtZcHZ5VGzMK69MGZFyDHRDCTnB8xhS+Zqs0TuAy38/bAZObgkz5qNTOwLQSv93Aq1UlMAGJ2Fg/wwVxXgTPmDl4MzmGzOhWb7rLhIYzfOwEdk2KCBgT1NDfF8vnR8T8lFEkpyx8oF5Ciappdbua2VQI7HUnSB1NN+C8D8lEj0c+tvMcludyGBYlBbdBtagAAVtgMrxnwxl/KDeXJMRLEWaVnYG3Gq7l0naxSjuRthvnfC2RjUs2TgBO2po0AvShoAuAOp9+uLeMZeWWNYUCqWVCNPmtvZokEhVG1730oXhLmMvnZZ3y7DKPp3k5ZgXuMHyt3ZivwsygDbSu4YgAu4zmcgIwY0iDGSJaCptD5i3yopOpyATtstDrYLXjEbZp0jjhZWV49L3JFo0uAWVpUBGqytAMeu1DHOZ4fnhNBBrii1zl9MeXUIFhDTagDJZAkZAQa3ZfTDPM8HL/8AWZ5WU0Xjhj8tXsXzmMsx5mY1qAPpRwC3hniM5WV0zUkJLyoizeYrrojpAkijSyteptdBSWOw6Ya+HOI5ps1PmvsZly5jWGMx6FZljeR1kWOVwdB8wgHvW2JxjhEP2GRUiQJGpYARoqlVamHMCbr0objHUcmYysoyihmVhI2XcMDJoTrC7MRZXqvcjc7qdQHcU8UZm0EOSWOiGueWMXY2oRazW+91/gTluP8AEXZVXL5PUR0OZl22vYiAg9D09MCRAOQ6uxjkZFWr+7YEalJRdIaxdA11o+t3D4KCs7kmMkDkawwVzd1d8xGAD8OcYzywmT7PlmM8skhvMSrVuEr/AKudgKHXer9sN08WqHUZmCWHSCS4HmRURsdcd6V92CjCvwi95LKlmomKNr0uAS/lysDR62dq7Xh5lZdJQ6wAEUElJPyyX1Pt/DAO8hn4pkEkMiSIejIwYfqMZPxTE3EQ+VywXSpKTZhjSr+aNKBLydifhU3uSCuCeIcJykkiykBXN6pIRLE5GksLeMhmXvRsHHH/AMPs678PyixxABYYwxJKgcisaFWTv8vfAD5jw1M7HzJWBDKyJEqFSFFDU8im69AF3A69cNB4fj0qZJJpRqWg7aQoJ7LGFFknq1n3xohinOfD0JoqdvQMCf4YALL8Fy0LeakKKwB5qsgVvRO42wblEIFt8THUfb2+goYrkl1jSm4PVuwHf5n5YLGAmJiYmAmM5n8qms8o/Qdzf8ycaPCKaXfYMx31EAnez19+m2APkH+kxn/ZSf8AFHg7GYT7as7EeVmFitN/upOcI53AZGoAdksntW5o8SRLtOsmWP8Atlpf96tx/wDawDrFeYhDqyN0YEH5HbHsUoYAqQQehBsH6jHeATZfOMj6ZUkLBACyIWDUSNQ03V9aIGLZ+JRMK16WBB5kYUQehBAwYP6X+wP5nHeazKRozyMqIotmYgAD1JOAzHEsnFmcoUWSMzOQySDSWSQtrRh32avehgjhOZE8cEqeYC0bFl13pYEKyMSTRVwQaOxU4H4bnpvLUR5KcqSrK7GJAQK6qz6xYHQqDhRLms7lc0VWKCGPNajHrkZ1jlA1SUEQWXA16bAtXN71gDshlFjlzDSuz1L5ZJYLQEMbrbWKA36mtz3OEMvimBMuixuZ5zCQsaFZQASFDSMFbQiVbMew7nHXGctHDKuZcfa5JWU+RMNLu4UVJCANMZVaBJWiEUlx1JnhviJUyCeMJnJ1upDopQpZY46XS6IL3U7kliFugAcPA4JImlEofNM2oZpVoE6QaC6zH5PUeWbHT8RvHnDOPQ2sEkMZzCMdaRRqwNK1m2cKButhiCCaPu6zvh+N5pGaOQMaaTQ8ixygqOUiOlL7DdgdqsnahuO5TXlI4ky0SkzCKA7oY2YMNagAMpRbPUE6ffAVcBTzhqEohVZFjYZZGOoqlFfOK6drN+WAQwYatjh3wuOPL/0SigrsdSS6mOqtTO2pnagBZsnp3wlyf2vKhIIQZcvGajQ+Wsyrp1fGSI5N2AolD3LMcEvxDMLoU5POEkltzl7rUCRtma+JlH/JwHWcyuriGVDFSTlsyzfdkbh8ux+LrvhkuUjVkJkUNqX4gAKCatgK9OpvGZzfEsy2eyd5LNFxDmlKmXLgtzQ2RpmIAWlsEi7FXRp/ksxm+YLw4WNN+dmUB+EDbSsgrY9x8sBx4qVWy2b+88wmFmCjZem96R+yOprfFniLKQZhCyMFkVFkidQSVkslCQvxDsQexYd8L+PSZ1cvMWyEABjmBIzV0GUm68gdK9cdNNxL8OVjpY4zX2td9JJH/wAsdzVV74ATIZgSmXUhjnjcHMQglQoBtZkrdxQ5TW6iqtQMdcSzH9XDGJZpidCKzlWHMpl1VyxAEEsOuwFtthVn4s5LKsvlQxTfhnacy3dAr5YgTUG0/BfLs1Ct9D4GnjiDctOxAn1EGSKToFdhs0b7lStKNqFEUBvA+ECOBcsRMDEkSghq+BAquOm9r6VtR9MMMhkVfUkmsEALo8x7rm5tm6NqI9qI63i3NZsiVtIGpF73WnYt06t+zYqr778yy6yVAJlQ7OukV0I+I7ggixuPkawHHF8rHFEW5lVUcnnfoIz7+g/hgb/4fZR4snGki6WCR2NRNVDGN7+XTHPFi0yPl5iqSNG1JpLKwZWUMG67E+1dwdiSvBGe87I5eUqFLxq1DuKoE+5AvAPcTExMBMTExMBMTExMBDimTMIppnUH0JAxdhJxNWLnQGO29BTv9fasAfw+OjISSSznrXYBQNvYYImdQOcgDvqqv44SZnw+gGsyZl6Oph58gsd+VCoO3au2L4fDWS+IZaFr31Mocn3trOAS54cNSVdGYjy7kkn7PMELGr5kQ6X335lOORx2VL8qWTMqvUSZSdTt/tkQR/XThvxziEOUWMBR5hb7qCNRrlNfCij2O7HZepIGF4yefzI8xpoIaJ05cxGVV6V5ra1LOOtClHa61EKcl43DFTJlM0jsp5RGGFBlFhrA08w3NdRiqD/SZhNOhLqQViYEx5dOmoi9Lyhh8Y9aBpbNWbyfEftseqbI6mgmthlpgNIaK9Q+0WT0o3tR9qubwxJJcualMmpa8qLVChskDXzM77HdS+nrsdsAyzHiyGOTyldsw16SsMTyFTV0zRgoDW9MVOEPE+MZmfMBo8t5SQArqzDx0rPsZDEjMzlFFBbX4msjGt4dwVYQqq5CoulAABXqaHL27AY6yeVP5rZLXmUGrNk7V8Wx+uAS5fhaxfeqZJnmALTsoL2vQAEUqbgiNQBs3reO5uGpOPLmQCJrZiXQhuh1KdyragCCCNO5FHGh85l+NbH5lvb5jr+l46igjPMqob3sAb+94DD8PbRN5UsccoZi0Mnli3jW1KyHorqOezWoUeoaiuJwoBkxpdR9sW9mVRyyKDygKCSRv3Jw74/k2laJQjlQS4ZHCFHFBSWvUBRbZQbujtjMxcP4nLDGrSRyoCpkWUr5muNw3I8aKAdS/iU7Vv3wG0HCofyDfbck7bCtz0oD9BhLmolMjMlgIyxDTrHRlLdBuLNEeqj0xdluOahLqZ0kjGoxOqq9V9Qw1balJXcb4JfJmPL1qYsACearYtqb5WxJwGa4kif5UywJajFmSA6yN1OWGw2sXfsK3w7heFWZigIKKQQqjYFu2q73GAeMQXxLJhSSTls11kO3Nl+4v1+uGsvDWVNyDSaTzOL6elenTAC+IYRLlZljgdzpZQNSjcr7v7jHHCs5G4jbSI42jDMpoBhWzEjl62NB362Bp3Y5rIUjnTGbN9/b/DCuDKtlcyY1KiPNEsvKAiyAEuoHW2UFx1upOm2ANMKs2kKpvmVP9Ve/mfMneuu9DvhZxnhjhjLAuueNamoqBmYjuY3vbzKspey32VqwwmynljShojmMoA5fdwOre47Xewog52cj+iRztboN29ebsUY9iQWs1W+AGyGdiZFkDN9nbdHNhiBsygfEJAeVtQthfWmwwyfEQI1lMlysNYi0i2VqNAAWx00NQ22Ha8JfEeReFmzCxyCGRh54Yx2jkhVmjCkhTdB72qmINMGL8M5d8jAxkUNLZOYCUWkduZXUmi5IOkjbcGgKIIaBjOCX8lbYKKVwXUA9OYBSRZPxV8+4HgnKaYUGkqIg0QB0n4HKHdfZQN/fFv2l9Il5irdfvKC3VadJNrXtff1xxwXM6J3QEtFOS8b/AITIBzqhJsgqA4PciQjbAaTExMTATExMTATExMDywajzMdP5RsPr3P8AL2wHAcyfCdKfm7t+76D3/T1wRHGFFDYY6Arpj3AeE4yee4++sw8PjE7mwWY6YI2HW5N9RHdEDH1rvf8AZZ86T5wfL5UHaEHTJMPWUruiH/VqbP4j1XD1clGEEaqERQAoUAaa6aa6VgFfhvgRg1SzOJc1Kbkl9vwxp6RqNgABZskWcNJ4TetK1eh6MPQ/3Htj2GUg6H69j2b/AAPt+ntecBnMy3nZ6IJtogk80HqokdNK/M+W/wBBe9jDzNsOUdywofLf+7CPgU5qbNkFlnkLKR1Eafdx/NGAL2ems9ujzLxG9TUWPp0A9B7e/f8AQACMBTSaZLCk8vPXbfl27/iwbgSysnqJD9QQP4rQ+h+eAIEgI1Aiut9sDQAl9ailPX9v0IHb59/Tpi1sohNlRf8AA/MdD9cX4CHCSLLRfaMwaAFIXOorz6TZ2I/AE3w7wPNko2bU0aM3qVBP6kYDOcS4Rks1JHGFV2BLl1YlkCihpcG1Ysy9D0vHc+SzMKFRHHmo6oEBEmA2oUQI5O+9p22O5w6jUeeQABpjXp7s3+GBfEMrt5eXjbS07FSw6rGo1OV/aIpQexYHtgFHBOK5fMZwyAiMohiiSQaHclrlZQfiUFFQFSd1ftROlkXW+k/CoBI9SboH2FXXyxy/C4WiELRI0SgAIVBAA2FA4XjgbxEnKzsgJsxy3LGflqPmLsKAD0PTAM+If0bC9yKHzOw+t4T+MoSMnM4dtUY81Dy8rIdSnYeo+osd8eNxWWNrzeXdVXo8OqaP94hVEinr1WgPxb4t47PHmchmfJkjcNDIAysGW9J2JHvtgDcw5TTFF8b2dR30gfE7epsgAepHYGqTw4RI/l9GBZ7O5avjuquqFbDZQKAxR4XmWZDmQuhpOUxnrFpsFG/a1WT8x1AGHZwCPNStPEY3UENaSoq6wQQdQ1EVRHte+MlwNMz5jR2rZnJqFPmyEGSMklGIAIb7uheoU4fpZOPo6lRsKHsKxkPEsJEy5mFPNlh1XENzNHtqX5retb21WNgxwHmSgeXQGIMEkjMqbr0S6OxagbWjQIFEEYdcSykskax2gkHOj77OlaT0Ao3R26E7b4W5YFymahLSK1uQi9bUjUhYVdbFB1IG9g6n+XiikVXB1giwxYmwf4D5YATJTJIiuiNbLbU1MpvSQTfMwYMN/wApwZA76gOYjvqUCtvVduuAMoiw5x41FLOnmgdtaEK9elhkah31HqTh3gJiYmJgJiYmJgJiYmOS4HfAdYmJiYDiWIMKI2/53HocJPE+beLJ5mzTCGQo/qQpr5MP49fYPsD5/JRzRtFKgdGFMrdCPQ4CmKo444o1FhAqr2CgAb+igf4YiIYQLJKdz+Q+v7nt2+XQqOEDcDc1v8th1xZgKZ5wovqT8IHc/wDPfA4jdD5h5ifiAHwj9nuQO46nr7YJjy6r0FUKHsOtD0xbgOIpAwsGxjvHKqB07745jmViwBBKmmrsaBo/Qg/XAWYmOGlUGiRe3f1ND9TtjrABwf08p9FQf8R/vwHxH/rmU/dm/kmGiKoZqrUaJ9fQfyxXmUjDJI9AqdKsexcha+poYAnEx5iYD3Gf8TcHy5imlZfLfQ33kZZGOx2JSiw36Gxh/eFOfXKTrKspjkRR96GawAPzWaA2PtscBl/Da5i8xOhfNZeWUUQyxyNojVGcABY3GpSu2knTdnGiynEMrLKqKVD01xOuhx06o4DdutVg9eIQLaCSNdC3QIGlaB6dhRH6jFebhy2ZVBIIpQxOi6JsdSp6gjfcURgC5oE0nlXoewxRlkCmMAVyf+HHCZvLogTzV0gmPmkLGxsVJYk2Lo2dsXtmYlLWygxKC245Ael+gNfwwGez/wD0dI2YW/sch1ToAT5DnrMoFnQx+NR0PP8AmuzhHEo1Tzo5EfLsV1FWBEZKrzgj8JN6vQ7/AJsPXlidmiJViBzJ122O4+o2PrhR/mPw+gBlIhXdQVNDYAsCGIA2AJ2wE49mlV8tPzARyU5Mb7JIpT8v59B+mDv8uwfmbb/Zyf8AhxR/mtltJTTJpIor589EehGuiMMY8igugd/VmPT5n2GA7yuZWRQyG1O4PzFj+BvF2K8vAqKFUAAAAAewofwGLMBMTExXPCHUq24OxFkX+mAX5/POX8iDSZKtmbdYlPQsB8THsli6skDFX+bWXbeaMTyHrJKAzH5bUq+iqAB6YY5PJpECEWrOo7kkk9yTuTQA37ADtgjATExMTATExMTATExMTATExMTAC8Ty3mRPH01CtiR/Ef4HCJfDTgX5i+YaJYAi6RABQOw1Je3rj3EwHMnhlmZnYxszFDuG2KTtNX7pVtP0GO4PDTAjVIWpmJtn5iQwBNVTAkGxfQegqYmA4h8NMtcyE6VU2DuFkZwp01YKtR23I6G8dN4bkKlTLuTERJvrTQVJVLsVy2L7ne8TEwBT8IkPlWyfdoUFa9iQn3gsnnBU1d7N162IPDLnrIAOyrroH7vmFm7Ohr/fPuTMTAOcjkTGqrrNIzkAdCrE6VN9lBAHywszPAZJfM8yXSWblMYWtI1aUZXVhpBbWSNywuwKGJiYCZfgciVUiMEJcFlNligQhtNDT8RFfs/l3ph8NyKVImKkAjUpbUgLu7BdVhtWpQWcE2oO56e4mAsj4BIi+WsgeMvqYSAAldKjTcajYlbbbfb3xXL4YbUx85pAxRislDUVaRt2iVW2LqR6aB9PcTAHcP4W6SB2kukpyC1ytpRdbgnSDy9Rv0+rfExMBMTExMBMTExMBMTExMBMTExMB//Z"
                alt="user google photo"
              />
              <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                  {currBorder.borderRegion[0]}
                </Typography>
                <Typography gutterBottom variant="h7" component="div">
                  {currBorder.crossingName[0]}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h7"
                  component="div"
                  sx={
                    currBorder.portStatus[0] === "Open"
                      ? { color: "green", fontSize: "1.2rem" }
                      : { color: "red", fontSize: "1.2rem" }
                  }
                >
                  {currBorder.portStatus[0] === "Open"
                    ? "Port is Open"
                    : "Port is Closed"}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      );
    }
  };

  loadBorderInfo(readyData);

  const crossingClick = (currBorder, userId) => {
    navigate(`/borderpage/${currBorder}`);
  };
  if (allMexicanBorders.length > 0) {
    return (
      <div className="container">
        <AccountMenu variable={userId} />
        <Grid container spacing={2}>
          <Grid xs={12} sx={{ padding: "80px" }}>
            <div>Last Updated Date: {readyData.lastUpdatedDate}</div>
            <div>Last Updated Time: {readyData.lastUpdatedTime}</div>
          </Grid>
          <Grid
            container
            spacing={2}
            wrap="wrap"
            xs={12}
            sx={{ padding: "0px" }}
          >
            {allMexicanBorders}
          </Grid>
        </Grid>

        <ModalPopulate />
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
export default Home;
