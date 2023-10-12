import {
  HomeSection,
  HomeSectionDescription,
  HomeSectionTitle,
  HomeSectionTitleHighlight,
} from '@/components/home/Home'
import { getLayout } from '@/layouts/DefaultLayout'
import Image from 'next/image'

export default function AboutUs() {
  return (
    <div className="container mx-auto flex max-w-5xl pb-16 pt-20">
      <div className="mx-auto w-full space-y-16 px-4 sm:px-3">
        <HomeSection>
          <HomeSectionTitle>
            How <HomeSectionTitleHighlight>ReturnPal</HomeSectionTitleHighlight>{' '}
            Began
          </HomeSectionTitle>
          <HomeSectionDescription>
            ReturnPal was born out of a simple realization: the traditional
            process of returning online purchases is far too complicated. Two
            brothers after waiting in line at the post office, decided there had
            to be a better way. Thus, ReturnPal was created to streamline
            returns for both consumers and businesses, while also making a
            positive impact on the community.
          </HomeSectionDescription>
        </HomeSection>

        <div className="m-[calc(-50vw+50%)]">
          <div className="relative">
            <svg
              className="h-[45rem] w-full fill-brand"
              version="1.1"
              preserveAspectRatio="none"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 1920 1080"
            >
              <style type="text/css">
                .st0{'fill-rule:evenodd;clip-rule:evenodd;fill:#052A42;'}
                .st1{'fill:none;stroke:#000000;'}
                .st2{'fill:#052A42;'}
              </style>
              <path
                className="st0"
                d="M0,0l80,17c80,18,240,52,400,70c160,17,320,17,480,0c160-18,320-52,480-52s320,34,400,52l80,17v207h-80
	c-80,0-240,0-400,0s-320,0-480,0s-320,0-480,0s-320,0-400,0H0V0z"
              />
              <g>
                <path
                  className="st0"
                  d="M1919.4,1064l-80-17c-80-18-240.1-52-400.1-70c-160-17-320.1-17-480.1,0c-160,18-320.1,52-480.1,52
		S159,995,79,977l-80-17V753h80c80,0,240.1,0,400.1,0s320.1,0,480.1,0s320.1,0,480.1,0s320.1,0,400.1,0h80V1064z"
                />
                <path
                  className="st1"
                  d="M1920,1063.5l-80-17c-80-18-240.1-52-400.1-70c-160-17-320.1-17-480.1,0c-160,18-320.1,52-480.1,52
		s-320.1-34-400.1-52l-80-17v-207h80c80,0,240.1,0,400.1,0s320.1,0,480.1,0s320.1,0,480.1,0s320.1,0,400.1,0h80V1063.5z"
                />
              </g>
              <path className="st2" d="M0,309h1920v464H0V309z" />
              <g id="Layer_2"></g>
            </svg>

            <div className="absolute top-32 w-full py-2.5 text-center text-xs leading-4 text-white">
              <div className="container mx-auto max-w-5xl space-y-10">
                <p className="text-4xl">
                  <a className="text-white">Our</a>{' '}
                  <a className="font-bold text-primary">Founders</a>
                </p>
                <div className="flex justify-between px-12">
                  <div>
                    <Image
                      className="border-8 border-primary"
                      src={'/images/returnpals-hasan.png'}
                      alt="Hasan-Ali"
                      width={300}
                      height={300}
                    />
                    <p className="text-lg font-bold text-white">
                      Mohammed Al-Salem
                    </p>
                    <p className="text-lg text-white">
                      Co-Founder of ReturnPal
                    </p>
                  </div>

                  <div>
                    <Image
                      className="rounded-full border-8 border-primary"
                      src={'/images/returnpals-hasan.png'}
                      alt="Hasan-Ali"
                      width={300}
                      height={300}
                    />
                    <p className="text-lg font-bold text-white">
                      Mohammed Al-Salem
                    </p>
                    <p className="text-lg text-white">
                      Co-Founder of ReturnPal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <HomeSection>
          <HomeSectionTitle>
            Our <HomeSectionTitleHighlight>Mission</HomeSectionTitleHighlight>
          </HomeSectionTitle>
          <HomeSectionDescription>
            Our goal is to revolutionize the returns process for online shoppers
            by offering a hassle-free and convenient solution. We aim to
            alleviate the stress of the return process by managing the entire
            repackaging and delivery process on your behalf, allowing you to sit
            back and relax.
          </HomeSectionDescription>
        </HomeSection>

        <div className="m-[calc(-50vw+50%)]">
          <div className="relative">
            <svg
              className="h-[45rem] w-screen fill-brand"
              version="1.1"
              preserveAspectRatio="none"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 1920 1080"
            >
              <style type="text/css">
                .st0{'fill-rule:evenodd;clip-rule:evenodd;fill:#052A42;'}
                .st1{'fill:#052A42;'}
              </style>
              <path
                className="st0"
                d="M0,1080l80-17c80-18,240-52,400-70c160-17,320-17,480,0c160,18,320,52,480,52s320-34,400-52l80-17V769h-80
	c-80,0-240,0-400,0s-320,0-480,0s-320,0-480,0s-320,0-400,0H0V1080z"
              />
              <path
                className="st0"
                d="M1920,0l-80,17c-80,18-240,52-400,70c-160,17-320,17-480,0C800,69,640,35,480,35S160,69,80,87L0,104v207h80
	c80,0,240,0,400,0s320,0,480,0s320,0,480,0s320,0,400,0h80V0z"
              />
              <rect y="203" className="st1" width="1920" height="603" />
            </svg>

            <div className="absolute top-32 w-full py-2.5 text-center leading-4 text-white">
              <div className="container mx-auto space-y-20">
                <HomeSection>
                  <HomeSectionTitle>
                    Why Choose{' '}
                    <HomeSectionTitleHighlight>Us</HomeSectionTitleHighlight>?
                  </HomeSectionTitle>
                  <HomeSectionDescription className="w-2/4 leading-6 text-white">
                    We value sustainability and community empowerment. Through
                    our Corporate Social Responsibility (CSR) initiatives, we
                    collaborate with businesses to repurpose and donate goods,
                    directly benefiting underserved communities. If your
                    organization is looking to fulfill its CSR goals, we invite
                    you to reach out to us. Let&rsquo;s join hands and create a
                    positive change together.
                  </HomeSectionDescription>
                </HomeSection>
                <div className="flex items-end justify-evenly">
                  <svg
                    width="134"
                    height="182"
                    viewBox="0 0 134 182"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M67 181.631C103.825 181.631 133.788 151.674 133.788 114.849C133.788 79.0806 105.495 49.8739 70.125 48.2239V38.3868L74.4877 34.0241C76.3249 35.0176 78.4564 35.5866 80.7814 35.5866C81.6316 35.5866 82.4935 35.5176 83.3817 35.3802C87.482 34.7305 91.6129 32.5742 94.713 29.4739C103.894 20.2929 103.72 4.13723 103.707 3.4489C103.675 1.7679 102.319 0.411063 100.638 0.379896C99.9377 0.348646 83.7809 0.21128 74.6192 9.3734C71.5189 12.4737 69.3692 16.6046 68.7129 20.7106C68.1881 24.0166 68.6881 27.1102 70.0443 29.6234L67.0006 32.6736L63.9446 29.6234C67.0449 23.8799 65.3319 15.3297 59.3756 9.38006C50.1881 0.186062 34.0322 0.380063 33.3506 0.386563C31.6696 0.417813 30.3127 1.77393 30.2816 3.45556C30.2692 4.13655 30.0941 20.2922 39.2751 29.4806C43.2874 33.4871 48.4749 35.5932 53.1937 35.5932C55.4816 35.5932 57.6312 35.0496 59.5062 34.0372L63.8754 38.3869V48.2241C28.5071 49.8738 0.21875 79.0807 0.21875 114.849C0.21875 151.674 30.1754 181.631 67.0004 181.631L67 181.631ZM11.3867 138.712C12.7181 139.193 14.1555 139.581 15.793 139.688C22.0932 140.094 25.2807 142.356 28.6492 144.75C31.8432 147.012 35.1427 149.356 40.5242 149.6C43.3804 149.776 45.6739 148.175 47.4995 146.925C50.0497 145.182 50.8557 144.844 52.2742 145.688C56.3927 148.137 59.1427 152.319 59.812 157.156C60.3368 160.962 63.2249 163.087 65.7742 164.962C67.5119 166.237 69.1557 167.443 69.8555 168.987C70.3803 170.124 70.2305 172.893 69.8679 175.243C68.9122 175.281 67.9682 175.381 66.9994 175.381C42.0927 175.381 20.6677 160.256 11.3861 138.712L11.3867 138.712ZM125.693 100.294C123.494 98.5941 121.712 96.4503 120.031 94.2875C116.281 89.4685 111.605 83.475 102.137 87.8623C98.587 89.5185 94.6372 89.725 91.1495 89.906C86.8124 90.1371 82.712 90.35 80.3435 93.4685C78.1495 96.35 78.6938 100.274 79.2934 102.975C80.3559 107.775 87.3371 112.256 91.2432 114.425L90.5245 129.65L88.5368 133.625C87.1429 128.875 85.3805 123.019 84.124 119.394C82.1618 113.707 75.1553 113.894 67.749 114.075C62.318 114.225 56.1487 114.375 52.5615 112.188C50.7737 111.094 50.5615 110.163 50.4867 109.851C50.0368 107.87 51.9619 104.889 53.374 102.713C54.7737 100.551 55.7868 98.9881 55.6051 97.1633C55.3428 94.4881 53.0863 93.4881 51.1677 93.007C52.5049 91.0818 53.5048 88.757 54.4736 86.4946C55.9548 83.0506 57.486 79.4881 59.9046 77.9509C61.5296 76.9197 63.8356 76.7882 66.2861 76.6508C70.7171 76.3943 76.2302 76.0818 79.824 70.1573C82.9737 64.9575 80.8552 59.4575 78.13 55.3826C101.425 59.7316 120.025 77.4693 125.693 100.294L125.693 100.294ZM74.8934 21.6939C75.3374 18.8626 76.8497 15.9818 79.043 13.7943C84.1804 8.65695 92.6804 7.20061 97.3047 6.78778C96.8919 11.4063 95.4362 19.9128 90.2982 25.0494C88.1042 27.2369 85.2292 28.7493 82.3985 29.1991C80.905 29.4491 78.1297 29.5676 76.3295 27.7616C74.5235 25.9556 74.655 23.1868 74.8927 21.6933L74.8934 21.6939ZM43.7 25.0566C38.5627 19.9193 37.1064 11.4128 36.6935 6.79495C41.3185 7.20771 49.8185 8.66345 54.9552 13.8014C59.3179 18.1641 60.6115 24.8203 57.6674 27.7701C54.7305 30.7134 48.0619 29.4198 43.6992 25.0573L43.7 25.0566ZM67 54.3133C67.7253 54.3133 68.431 54.3947 69.1497 54.4194C70.9934 56.1817 77.125 62.5321 74.4622 66.9194C72.6685 69.8816 70.1744 70.1629 65.9185 70.4071C62.9309 70.5757 59.5435 70.7756 56.5435 72.6759C52.4999 75.2507 50.4934 79.9136 48.7245 84.0196C47.5683 86.7006 46.481 89.2317 45.1374 90.4949C43.3685 92.1512 42.7187 93.8386 43.2122 95.5072C43.9557 98.0007 46.5247 98.4884 48.4244 98.8262C48.3182 98.9949 48.2121 99.1576 48.1119 99.3074C46.0995 102.42 43.3372 106.676 44.3742 111.233C44.9491 113.764 46.6054 115.876 49.287 117.507C54.4434 120.651 61.5995 120.469 67.887 120.307C71.568 120.226 77.7242 120.051 78.193 121.426C80.4867 128.039 84.6742 142.863 84.7177 143.013C85.0738 144.256 86.1487 145.156 87.4364 145.275C87.5366 145.287 87.6304 145.287 87.73 145.287C88.9051 145.287 89.9923 144.624 90.5237 143.562L96.3863 131.843C96.5803 131.456 96.6923 131.031 96.7112 130.593L97.5615 112.73C97.624 111.499 96.9488 110.348 95.8551 109.792C91.2424 107.449 85.8049 103.518 85.3798 101.611C84.6487 98.3177 85.1858 97.3927 85.2984 97.2429C85.9234 96.4304 88.9924 96.2676 91.4612 96.1368C95.3116 95.9369 100.105 95.6869 104.755 93.5241C109.474 91.3431 111.092 92.9994 115.08 98.1178C117.854 101.68 121.354 105.961 127.13 108.161C127.373 110.361 127.517 112.587 127.517 114.849C127.517 145.067 105.236 170.111 76.2489 174.592C76.5367 171.98 76.5992 168.705 75.5237 166.374C74.1422 163.367 71.661 161.536 69.4612 159.917C67.4052 158.405 66.1422 157.405 65.9858 156.292C65.0607 149.555 61.217 143.73 55.448 140.305C50.4357 137.329 46.5293 139.992 43.948 141.754C42.7292 142.586 41.4858 143.267 40.7852 143.342C37.2415 143.179 35.0352 141.616 32.2415 139.635C28.679 137.111 24.2415 133.96 16.1725 133.436C11.0625 133.118 8.3125 129.018 8.14384 128.756C7.08785 124.281 6.46867 119.637 6.46867 114.843C6.46867 81.468 33.6253 54.3114 67.0003 54.3114L67 54.3133Z"
                      fill="#008BE6"
                    />
                  </svg>
                  <svg
                    width="170"
                    height="149"
                    viewBox="0 0 170 149"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M83.2391 37.851C72.868 37.851 64.4308 29.4135 64.4308 19.0427C64.4308 8.67187 72.8683 0.234375 83.2391 0.234375C93.61 0.234375 102.047 8.67187 102.047 19.0427C102.047 29.4135 93.61 37.851 83.2391 37.851ZM83.2391 6.09271C76.0906 6.09271 70.29 11.8935 70.29 19.0419C70.29 26.1902 76.0908 31.991 83.2391 31.991C90.3875 31.991 96.1883 26.1902 96.1883 19.0419C96.1883 11.8935 90.368 6.09271 83.2391 6.09271Z"
                      fill="#008BE6"
                    />
                    <path
                      d="M82.1658 111.034H88.0251V145.546H82.1658V111.034Z"
                      fill="#008BE6"
                    />
                    <path
                      d="M129.061 148.469H114.51C110.447 148.469 107.127 145.149 107.127 141.087V109.875C107.029 109.562 106.971 109.25 106.971 108.898V90.5783C106.971 83.137 104.295 75.9495 99.4319 70.325C98.6702 69.4265 98.5139 68.1765 99.0022 67.1413C101.385 61.8483 104.803 57.2195 109.159 53.3523L109.627 52.9226C110.389 52.239 111.463 52.0242 112.44 52.3172C115.467 53.2547 118.612 53.7234 121.795 53.7234C125.506 53.7234 129.159 53.0789 132.635 51.8094C136.131 50.5399 139.334 48.6844 142.166 46.3016L153.827 36.5164C155.76 34.8953 158.202 34.1336 160.702 34.3876C163.202 34.6219 165.448 35.8524 167.03 37.8056C170.155 41.6727 169.686 47.2977 165.956 50.5791L147.049 67.3558C143.748 70.2854 141.15 73.8206 139.354 77.8244C137.537 81.8479 136.619 86.1252 136.619 90.5392V108.859C136.619 109.211 136.561 109.523 136.443 109.836V141.047C136.443 145.169 133.143 148.469 129.061 148.469ZM112.83 107.923C112.928 108.235 112.987 108.548 112.987 108.899V141.086C112.987 141.926 113.67 142.609 114.51 142.609H129.061C129.901 142.609 130.584 141.926 130.584 141.086V108.899C130.584 108.548 130.643 108.235 130.76 107.923V90.5794C130.76 85.3256 131.854 80.2474 134.002 75.4622C136.151 70.6771 139.237 66.4974 143.162 63.0012L162.069 46.2245C163.436 45.0136 163.612 42.9237 162.46 41.498C161.874 40.7754 161.053 40.3262 160.116 40.2285C159.198 40.1309 158.3 40.4238 157.577 41.0098L145.936 50.8339C142.577 53.6464 138.768 55.8534 134.647 57.3574C130.526 58.8614 126.19 59.6231 121.796 59.6231C118.593 59.6231 115.429 59.2129 112.343 58.4122C109.374 61.1857 106.952 64.4083 105.097 68.0215C110.097 74.4668 112.831 82.416 112.831 90.5998L112.83 107.923Z"
                      fill="#008BE6"
                    />
                    <path
                      d="M118.942 114.744H124.802V145.564H118.942V114.744Z"
                      fill="#008BE6"
                    />
                    <path
                      d="M93.3375 148.469H76.6773C72.3218 148.469 68.7671 144.915 68.7671 140.559V83.9959C68.7671 79.0154 67.732 74.1717 65.6811 69.6209C63.6303 65.07 60.7006 61.0662 56.9701 57.7459L56.5014 57.3357L35.7981 38.9574C31.7746 35.3832 31.2667 29.3089 34.6457 25.1292L34.6848 25.0902C36.3839 23.0003 38.8059 21.6917 41.5011 21.4378C44.2159 21.1839 46.8526 21.9847 48.9424 23.7425L61.9698 34.68C61.9893 34.6995 62.0088 34.6995 62.0088 34.7191L62.0284 34.7386C66.0322 38.0784 70.8174 40.5589 75.8565 41.8871C76.6573 42.1019 77.4581 42.2777 78.2394 42.434C82.712 43.2933 87.38 43.2933 91.8527 42.434C92.6339 42.2777 93.4347 42.1019 94.2355 41.8871C95.2707 41.6137 96.3059 41.2816 97.3019 40.9301C100.329 39.8363 103.2 38.3129 105.818 36.4574C106.599 35.891 107.36 35.305 108.083 34.7191L121.15 23.7621C123.239 22.0042 125.876 21.1839 128.591 21.4574C131.306 21.7309 133.728 23.0394 135.446 25.1487C135.603 25.344 135.739 25.5198 135.857 25.7151C137.634 28.2541 138.122 31.516 137.204 34.4651C136.657 36.2035 135.642 37.766 134.275 38.9768L113.083 57.7651C109.352 61.0855 106.423 65.0698 104.372 69.6206C104.372 69.6402 104.352 69.6597 104.352 69.6792C102.321 74.23 101.286 79.0347 101.286 84.0152V140.579C101.247 144.915 97.693 148.469 93.3375 148.469ZM39.1575 28.841C37.7708 30.5794 37.9856 33.0989 39.6653 34.5832L60.837 53.3715C65.212 57.2387 68.63 61.9067 71.0128 67.2192C73.3956 72.5317 74.6064 78.1762 74.6064 83.9959V140.559C74.6064 141.692 75.5244 142.61 76.6573 142.61H93.3175C94.4503 142.61 95.3683 141.692 95.3683 140.559V83.9959C95.3683 78.1755 96.5792 72.531 98.962 67.2192C98.962 67.1997 98.9815 67.1801 99.001 67.1606C101.384 61.8676 104.802 57.2193 109.157 53.3716L109.626 52.9419L130.329 34.5819C130.896 34.0741 131.326 33.4296 131.54 32.7069C131.931 31.4569 131.736 30.1093 130.974 29.0546C130.954 29.0351 130.954 29.0155 130.935 28.996C130.896 28.9569 130.857 28.8984 130.798 28.8202C130.076 27.9218 129.06 27.3749 127.927 27.2773C126.794 27.1601 125.701 27.5116 124.822 28.2343L111.755 39.1913C110.915 39.8944 110.037 40.578 109.119 41.2226C106.072 43.3906 102.732 45.1485 99.1967 46.4375C98.0443 46.8671 96.8334 47.2382 95.6225 47.5703C94.685 47.8242 93.7475 48.039 92.849 48.1953C87.6732 49.1914 82.224 49.1914 77.0287 48.1953C76.1303 48.0195 75.1927 47.8046 74.2552 47.5703C68.3958 46.0273 62.8489 43.1366 58.2005 39.2694C58.181 39.2499 58.1615 39.2499 58.1419 39.2304L58.1224 39.2108L45.0561 28.2538C44.1772 27.5312 43.0834 27.1796 41.9506 27.2968C40.8177 27.414 39.8021 27.9609 39.0991 28.8398C39.1576 28.8202 39.1576 28.8202 39.1576 28.8398L39.1575 28.841Z"
                      fill="#008BE6"
                    />
                    <path
                      d="M55.6425 148.469H55.4667C53.8456 148.469 52.537 147.161 52.537 145.54C52.537 143.919 53.8456 142.61 55.4667 142.61C56.3065 142.61 56.9901 141.926 56.9901 141.087V108.9C56.9901 107.279 58.2987 105.97 59.9198 105.97H60.0956C61.7167 105.97 63.0252 107.279 63.0252 108.9V141.087C63.0252 145.169 59.705 148.469 55.6425 148.469Z"
                      fill="#008BE6"
                    />
                    <path
                      d="M55.4858 148.469H40.935C36.8725 148.469 33.5521 145.149 33.5521 141.087V109.875C33.435 109.562 33.3764 109.25 33.3764 108.898V90.5783C33.3764 81.7111 29.5677 73.2533 22.9467 67.395L4.04002 50.6366C0.32902 47.3358 -0.139647 41.7303 2.9658 37.8631C2.98533 37.8436 3.00487 37.8045 3.04393 37.785C4.62596 35.871 6.83293 34.699 9.31343 34.4452C11.8134 34.1913 14.2548 34.953 16.1884 36.574L27.8486 46.3592C33.5518 51.1443 40.7783 53.781 48.2203 53.781C51.3843 53.781 54.5289 53.3123 57.5758 52.3748C58.5523 52.0818 59.6071 52.2966 60.3883 52.9802L60.857 53.4099C65.232 57.2771 68.65 61.9451 71.0329 67.2576C71.5016 68.2927 71.3258 69.5037 70.5836 70.3631C68.6305 72.6287 67.0095 75.1678 65.779 77.9021C63.9626 81.9256 63.0446 86.2029 63.0446 90.6169V108.937C63.0446 109.288 62.986 109.601 62.8688 109.913V141.125C62.8493 145.168 59.5483 148.469 55.4858 148.469ZM39.2358 107.923C39.353 108.235 39.4116 108.548 39.4116 108.899V141.086C39.4116 141.926 40.0952 142.609 40.935 142.609H55.4859C56.3257 142.609 57.0093 141.926 57.0093 141.086V108.899C57.0093 108.567 57.0679 108.235 57.1851 107.923V90.5794C57.1851 85.3255 58.2788 80.2474 60.4272 75.4622C61.6186 72.8059 63.1226 70.3059 64.9194 68.0012C63.0834 64.3879 60.6421 61.1652 57.6929 58.3919C54.6069 59.1927 51.4234 59.6028 48.2397 59.6028C39.4311 59.6028 30.8564 56.4778 24.0997 50.8138L12.4396 41.0286C11.7364 40.4232 10.8185 40.1497 9.90057 40.2474C8.9826 40.345 8.14274 40.7943 7.5569 41.5169C7.53737 41.5364 7.53737 41.556 7.51784 41.5755C6.40456 43.0013 6.59987 45.0325 7.94753 46.2435L26.8542 63.0202C34.7449 70.0123 39.2565 80.0519 39.2565 90.5985V107.924L39.2358 107.923Z"
                      fill="#008BE6"
                    />
                    <path
                      d="M40.935 148.469L40.7584 148.469C36.6959 148.469 33.3755 145.149 33.3755 141.087V108.9C33.3755 107.279 34.6841 105.97 36.3052 105.97H36.481C38.1021 105.97 39.4106 107.279 39.4106 108.9V141.087C39.4106 141.926 40.0942 142.61 40.9341 142.61C42.5552 142.61 43.8637 143.919 43.8637 145.54C43.8637 147.161 42.5365 148.469 40.935 148.469Z"
                      fill="#008BE6"
                    />
                    <path
                      d="M45.3491 114.744H51.2085V145.564H45.3491V114.744Z"
                      fill="#008BE6"
                    />
                  </svg>
                  <svg
                    width="168"
                    height="182"
                    viewBox="0 0 168 182"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M161.836 94.8497C158.312 93.1557 154.08 93.8809 151.324 96.6557L131.106 117.031C129.656 116.718 128.124 116.756 126.656 117.168L102.874 123.856C92.7614 126.699 85.6991 136.024 85.6991 146.531V178.499C85.6991 180.224 87.0988 181.624 88.8241 181.624H111.724C113.449 181.624 114.849 180.224 114.849 178.499V161.217L141.706 147.836C142.249 147.567 142.699 147.148 143.012 146.623L165.787 107.78C168.475 103.242 166.593 97.1305 161.838 94.8491L161.836 94.8497ZM160.392 104.624L138.092 142.668L110.342 156.492C109.28 157.017 108.611 158.105 108.611 159.286V175.374H91.9614V146.537C91.9614 138.825 97.1489 131.968 104.586 129.881L128.368 123.194C130.08 122.675 131.918 123.881 132.168 125.675C132.349 126.987 131.675 128.244 130.474 128.819L108.793 139.125C107.237 139.862 106.574 141.731 107.317 143.287C108.048 144.843 109.923 145.506 111.48 144.763L133.155 134.457C136.83 132.713 138.917 128.832 138.349 124.807C138.13 123.207 137.486 121.707 136.524 120.451L155.763 101.064C156.65 100.17 158 99.9267 159.131 100.477C160.649 101.219 161.262 103.157 160.393 104.625L160.392 104.624Z"
                      fill="#008BE6"
                    />
                    <path
                      d="M65.1279 123.863L41.3462 117.176C39.8775 116.763 38.3527 116.726 36.8964 117.038L16.678 96.6631C13.928 93.8885 9.70271 93.1443 6.16571 94.8571C1.41571 97.1573 -0.471622 103.251 2.21588 107.788L24.9959 146.625C25.3084 147.15 25.7582 147.569 26.3019 147.837L53.1585 161.219L53.1592 178.5C53.1592 180.226 54.5589 181.625 56.2842 181.625H79.1842C80.9095 181.625 82.3092 180.225 82.3092 178.5V146.539C82.3092 136.032 75.247 126.706 65.1279 123.863ZM76.0589 175.375H59.4092V159.288C59.4092 158.107 58.7406 157.019 57.678 156.494L29.928 142.669L7.61471 104.624C6.74623 103.155 7.34583 101.205 8.87708 100.48C10.0268 99.9366 11.3647 100.174 12.2456 101.067L31.4839 120.454C30.5217 121.711 29.8778 123.204 29.6591 124.81C29.0901 128.835 31.178 132.717 34.8531 134.46L56.5281 144.766C58.0782 145.516 59.9532 144.853 60.6909 143.291C61.4344 141.735 60.7723 139.865 59.2156 139.128L37.5406 128.822C36.3466 128.247 35.6656 126.99 35.8466 125.678C36.0966 123.897 37.8968 122.671 39.6468 123.197L63.4285 129.884C70.8595 131.971 76.0535 138.828 76.0535 146.541V175.374L76.0589 175.375Z"
                      fill="#008BE6"
                    />
                    <path
                      d="M86.2095 78.4313L81.2095 73.4313C79.9908 72.2126 78.0097 72.2126 76.7909 73.4313C75.6659 74.5563 75.6281 76.294 76.5721 77.5185H60.0721C58.9595 77.5185 58.4094 76.775 58.2285 76.456C58.041 76.1311 57.6725 75.2809 58.222 74.3245L64.2466 63.887C65.1151 62.3935 64.6027 60.4807 63.1027 59.6182C61.6151 58.7555 59.6964 59.2621 58.8339 60.7621L52.8026 71.1996C51.2961 73.8246 51.2961 76.9561 52.8091 79.5811C54.3214 82.2061 57.0402 83.7686 60.0656 83.7686H76.5656C75.6216 84.9938 75.6593 86.7372 76.7843 87.8557C77.397 88.4684 78.1971 88.7685 78.9965 88.7685C79.7966 88.7685 80.5968 88.4625 81.2087 87.8557L86.2087 82.8557C87.4157 81.663 87.397 79.6065 86.2095 78.4313Z"
                      fill="#008BE6"
                    />
                    <path
                      d="M96.1395 44.4497C97.633 43.587 98.146 41.6808 97.2834 40.1808L91.2588 29.7433C88.2341 24.4933 79.7711 24.4933 76.7464 29.7433L68.4964 44.037C67.9027 42.6119 66.3714 41.7993 64.8468 42.1808C63.1716 42.6307 62.1839 44.3437 62.6346 46.0057L64.4659 52.8428V52.8493C64.8969 54.4118 66.7224 55.4808 68.2908 55.0615L75.1279 53.2302C76.8031 52.7803 77.7908 51.0673 77.3401 49.4053C76.9215 47.8676 75.4338 46.9802 73.9026 47.1677L82.1526 32.874C82.7086 31.9124 83.6272 31.7998 84.0023 31.7998C84.3773 31.7998 85.2959 31.9124 85.8526 32.8688L91.8773 43.3063C92.7275 44.7933 94.6395 45.3058 96.1395 44.4497Z"
                      fill="#008BE6"
                    />
                    <path
                      d="M106.94 56.9063C108.471 57.1003 109.958 56.2065 110.377 54.6687C110.821 53 109.833 51.2937 108.165 50.8438L101.328 49.0125C99.534 48.5125 98.1962 49.6935 97.4964 51.2188L95.665 58.0502C95.221 59.7253 96.2087 61.4317 97.8772 61.8815C98.1519 61.9505 98.4208 61.9876 98.6897 61.9876C99.9462 61.9876 101.015 61.1628 101.502 59.9811L109.777 74.3248C110.333 75.2812 109.964 76.1308 109.777 76.4563C109.596 76.7753 109.046 77.5188 107.933 77.5188H95.883C94.1577 77.5188 92.758 78.9185 92.758 80.6438C92.758 82.3691 94.1578 83.7688 95.883 83.7688H107.933C110.958 83.7688 113.677 82.2063 115.19 79.5813C116.702 76.9563 116.702 73.8248 115.19 71.1998L106.94 56.9063Z"
                      fill="#008BE6"
                    />
                    <path
                      d="M141.628 72.6063C158.121 56.1063 158.121 29.263 141.628 12.7747C133.634 4.77467 123.01 0.375 111.715 0.375C101.421 0.375 91.6895 4.02467 84.0029 10.7063C76.3154 4.02467 66.5845 0.375 56.2912 0.375C44.991 0.375 34.3662 4.77467 26.3779 12.7688C9.88438 29.2623 9.88438 56.1055 26.3779 72.6005L81.7912 128.014C82.4038 128.626 83.204 128.927 84.0034 128.927C84.8035 128.927 85.6036 128.621 86.2155 128.014L141.628 72.6063ZM30.7962 68.1877C16.7402 54.1252 16.7402 31.251 30.7962 17.1943C37.6087 10.3818 46.6589 6.63183 56.2895 6.63183C65.9269 6.63183 74.9762 10.3883 81.7895 17.1943C82.9647 18.3695 85.0395 18.3695 86.2082 17.1943C93.0207 10.3818 102.071 6.63183 111.708 6.63183C121.34 6.63183 130.39 10.3883 137.202 17.1943C151.258 31.2503 151.258 54.126 137.202 68.1877L84.0015 121.388L30.7962 68.1877Z"
                      fill="#008BE6"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-14 text-center">
          <HomeSection>
            <HomeSectionTitle>
              Our{' '}
              <HomeSectionTitleHighlight>Operation</HomeSectionTitleHighlight>
            </HomeSectionTitle>
            <HomeSectionDescription>
              We are all over the greater Toronto area, operating a local
              facility designed to ensure that the repackaging of items can
              accommodate same-day return needs.
            </HomeSectionDescription>
          </HomeSection>

          <svg
            width="340"
            height="334"
            viewBox="0 0 340 334"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.74985 312.806H336.25C338.186 312.806 339.75 311.242 339.75 309.306C339.75 307.371 338.186 305.806 336.25 305.806H275.808V278.139C275.808 276.203 274.243 274.639 272.308 274.639H246.667L246.666 178.768C246.666 176.833 245.102 175.268 243.166 175.268H206.186V166.403C206.186 164.471 204.621 162.903 202.686 162.903C200.75 162.903 199.186 164.471 199.186 166.403V175.268H162.202C160.27 175.268 158.702 176.833 158.702 178.768V204.812H143.918C141.986 204.812 140.418 206.376 140.418 208.312V268.672C130.003 263.367 118.417 260.51 106.366 260.51C91.1233 260.51 76.6105 265.019 64.3051 273.365L61.4967 108.924C69.6304 108.111 76.0287 101.304 76.0287 92.9573C76.0287 84.5401 69.5219 77.6871 61.2835 76.976L60.1248 52.3392C60.1179 52.1535 60.0268 51.9963 59.9881 51.8209C59.9357 51.5554 59.9003 51.2854 59.7887 51.0473C59.7363 50.9356 59.652 50.8513 59.5859 50.7499C59.4104 50.4526 59.2224 50.1689 58.9661 49.9376C58.9308 49.9057 58.8886 49.8886 58.851 49.8601C58.5468 49.6049 58.2175 49.3873 57.8393 49.2471C57.7128 49.1981 57.5738 49.2016 57.4405 49.1662C57.1705 49.1002 56.9153 49.0022 56.6248 49.0022H54.0351L54.0339 3.77344C54.0339 1.84115 52.4662 0.273438 50.5339 0.273438C48.6017 0.273438 47.0339 1.84115 47.0339 3.77344V49.0051H44.4477C43.1602 49.0051 42.0813 49.7331 41.473 50.7722C41.4103 50.8702 41.3294 50.9511 41.2804 51.0559C41.1722 51.2872 41.1403 51.5492 41.0879 51.8044C41.0491 51.9867 40.958 52.1474 40.9477 52.3399L39.7993 76.8364H39.0018C30.1083 76.8364 22.877 84.0677 22.877 92.9577C22.877 101.851 30.1118 109.082 39.0018 109.082H40.2299L36.8667 305.803H3.7509C1.81861 305.803 0.250905 307.367 0.250905 309.303C0.250905 311.237 1.81861 312.806 3.7509 312.806L3.74985 312.806ZM59.2628 305.806V288.433H153.477V305.806H59.2628ZM246.667 305.806V281.639H268.808V305.806H246.667ZM165.704 182.271H239.67V201.514H228.505C226.569 201.514 225.005 203.079 225.005 205.014C225.005 206.95 226.569 208.514 228.505 208.514H239.67V219.063H228.505C226.569 219.063 225.005 220.628 225.005 222.563C225.005 224.499 226.569 226.063 228.505 226.063H239.67V236.616H228.505C226.569 236.616 225.005 238.18 225.005 240.116C225.005 242.051 226.569 243.616 228.505 243.616H239.67V254.165H228.505C226.569 254.165 225.005 255.729 225.005 257.665C225.005 259.6 226.569 261.165 228.505 261.165H239.67V271.717H228.505C226.569 271.717 225.005 273.281 225.005 275.217C225.005 277.153 226.569 278.717 228.505 278.717H239.67V289.27H228.505C226.569 289.27 225.005 290.834 225.005 292.77C225.005 294.705 226.569 296.27 228.505 296.27H239.67V305.814H217.946L217.945 208.318C217.945 206.383 216.38 204.818 214.445 204.818H165.704L165.704 182.271ZM147.423 267.98H156.979C158.911 267.98 160.479 266.416 160.479 264.48C160.479 262.544 158.911 260.98 156.979 260.98H147.423V253.938H156.979C158.911 253.938 160.479 252.373 160.479 250.438C160.479 248.502 158.911 246.938 156.979 246.938H147.423V239.899H156.979C158.911 239.899 160.479 238.335 160.479 236.399C160.479 234.463 158.911 232.899 156.979 232.899H147.423V225.857H156.979C158.911 225.857 160.479 224.292 160.479 222.357C160.479 220.421 158.911 218.857 156.979 218.857H147.423V211.814H162.19C162.197 211.814 162.2 211.818 162.207 211.818C162.214 211.818 162.217 211.814 162.224 211.814H210.947V218.857L175.264 218.858C173.332 218.858 171.764 220.422 171.764 222.358C171.764 224.294 173.332 225.858 175.264 225.858H210.944V232.9H175.264C173.332 232.9 171.764 234.464 171.764 236.4C171.764 238.336 173.332 239.9 175.264 239.9H210.944V246.939H175.264C173.332 246.939 171.764 248.503 171.764 250.439C171.764 252.375 173.332 253.939 175.264 253.939H210.944V260.981L175.264 260.98C173.332 260.98 171.764 262.544 171.764 264.48C171.764 266.416 173.332 267.98 175.264 267.98H210.944V275.022H175.264C173.332 275.022 171.764 276.587 171.764 278.522C171.764 280.458 173.332 282.022 175.264 282.022H210.944V289.061H175.264C173.332 289.061 171.764 290.625 171.764 292.561C171.764 294.497 173.332 296.061 175.264 296.061H210.944V305.813H160.477V284.939C160.477 284.485 160.386 284.029 160.207 283.602C160.028 283.171 159.769 282.783 159.447 282.461C155.744 278.755 151.705 275.517 147.418 272.71V267.98L147.423 267.98ZM65.1808 281.434C76.9511 272.45 91.2553 267.515 106.373 267.515C121.489 267.519 135.793 272.45 147.565 281.434H65.1808ZM47.7917 56.0081H53.2902L54.27 76.8407H46.8153L47.7917 56.0081ZM29.886 92.9652C29.886 87.9363 33.9807 83.8439 39.0108 83.8439H59.9093C64.9382 83.8439 69.0306 87.9351 69.0306 92.9652C69.0306 97.9988 64.9393 102.09 59.9093 102.09H39.0108C33.9807 102.09 29.886 97.9953 29.886 92.9652ZM47.2425 109.09H54.4977L57.3995 278.738C56.0061 279.942 54.6071 281.146 53.2899 282.462C53.2649 282.488 53.258 282.522 53.2341 282.543C52.9436 282.851 52.6986 283.202 52.5346 283.597C52.3557 284.028 52.2646 284.483 52.2646 284.938V305.812H43.878L47.2425 109.09Z"
              fill="#008BE6"
            />
            <path
              d="M336.25 326.719H3.75C1.81771 326.719 0.25 328.283 0.25 330.219C0.25 332.155 1.81771 333.719 3.75 333.719H336.25C338.186 333.719 339.75 332.155 339.75 330.219C339.75 328.283 338.186 326.719 336.25 326.719Z"
              fill="#008BE6"
            />
            <path
              d="M115.365 99.2888H164.665C170.336 99.2888 174.949 93.8633 174.949 87.196C174.949 81.7433 171.838 77.1758 167.606 75.6776C166.976 73.6826 165.859 71.8835 164.27 70.473C162.684 69.0694 160.795 68.1978 158.782 67.8412C157.06 63.7885 153.875 60.4731 149.721 58.5557C142.368 55.1741 134.02 57.1316 129.145 62.728C127.996 62.0456 126.729 61.5386 125.341 61.297C122.352 60.7787 119.233 61.4121 116.566 63.096C112.373 65.7598 110.277 70.432 110.878 74.8038C107.143 76.8307 104.532 81.2753 104.532 86.4524C104.532 93.532 109.39 99.2888 115.365 99.2888ZM120.311 69.0138C121.5 68.2653 122.87 67.9714 124.147 68.1981C125.299 68.3975 126.243 68.999 126.804 69.8888C126.86 69.9766 126.947 70.0221 127.007 70.1019C127.15 70.291 127.311 70.4551 127.493 70.6134C127.675 70.7707 127.853 70.9074 128.057 71.0259C128.145 71.0749 128.204 71.1592 128.299 71.2014C128.41 71.2538 128.526 71.2435 128.638 71.2822C128.866 71.3597 129.089 71.4155 129.331 71.4463C129.555 71.4748 129.768 71.4816 129.989 71.4668C130.21 71.4531 130.416 71.4178 130.63 71.362C130.864 71.2993 131.081 71.215 131.302 71.1068C131.407 71.0544 131.526 71.0475 131.628 70.9837C131.715 70.9279 131.764 70.8402 131.844 70.7775C132.033 70.634 132.194 70.4767 132.351 70.2945C132.508 70.1122 132.648 69.9344 132.764 69.7271C132.816 69.6394 132.897 69.5801 132.939 69.4855C135.231 64.5091 141.454 62.4605 146.792 64.918C149.837 66.3217 152.049 68.9148 152.858 72.0365C152.897 72.1834 152.981 72.2951 153.037 72.4318C153.106 72.6073 153.17 72.7782 153.261 72.9388C153.376 73.1279 153.516 73.2886 153.66 73.4538C153.797 73.611 153.919 73.7728 154.084 73.9016C154.234 74.02 154.41 74.0907 154.577 74.1852C154.861 74.3391 155.148 74.4621 155.473 74.5316C155.724 74.5908 155.976 74.6615 156.243 74.6615C156.299 74.6615 156.358 74.6444 156.415 74.641C156.447 74.641 156.474 74.6546 156.506 74.6512C157.622 74.5772 158.749 74.9418 159.624 75.7222C160.528 76.5231 161.077 77.6442 161.168 78.8792C161.185 79.1002 161.28 79.2848 161.332 79.4922C161.384 79.6847 161.406 79.8841 161.486 80.0664C161.594 80.3045 161.759 80.4971 161.913 80.7033C162.025 80.8468 162.106 81.0075 162.235 81.1374C162.438 81.3333 162.687 81.4632 162.932 81.6068C163.068 81.6843 163.18 81.7959 163.327 81.8551C163.736 82.0226 164.185 82.1252 164.65 82.1252H164.653C166.207 82.1252 167.937 84.2113 167.937 87.2078C167.937 90.2075 166.204 92.3005 164.653 92.3005L115.364 92.2994C113.552 92.2994 111.532 89.9023 111.532 86.4649C111.532 83.0276 113.552 80.6304 115.364 80.6304C115.77 80.6304 116.173 80.5324 116.565 80.3889C116.68 80.3433 116.786 80.2943 116.894 80.2419C117.006 80.1861 117.122 80.1576 117.231 80.0915C117.339 80.022 117.398 79.9126 117.501 79.8363C117.69 79.6859 117.861 79.5321 118.016 79.343C118.159 79.1709 118.274 78.9932 118.384 78.8007C118.488 78.6081 118.579 78.4156 118.646 78.1991C118.72 77.9678 118.761 77.7445 118.789 77.4996C118.803 77.3731 118.863 77.2649 118.863 77.1361C118.863 77.0415 118.814 76.9572 118.807 76.8627C118.79 76.628 118.733 76.4081 118.667 76.1768C118.601 75.9455 118.527 75.7325 118.419 75.5228C118.373 75.4385 118.37 75.3474 118.321 75.2642C117.082 73.2943 117.98 70.4949 120.311 69.0138Z"
              fill="#008BE6"
            />
            <path
              d="M203.915 121.371H237.509C242.641 121.371 246.812 116.503 246.812 110.518C246.812 105.73 244.113 101.701 240.413 100.269C239.219 96.798 236.312 94.2185 232.773 93.5042C231.226 90.0497 228.506 87.2004 224.937 85.5551C217.769 82.2511 207.472 84.3577 201.68 94.4317C196.44 95.6747 192.479 101.177 192.479 107.766C192.481 115.268 197.613 121.371 203.916 121.371L203.915 121.371ZM203.915 101.163H203.922C204.334 101.163 204.734 101.065 205.119 100.921C205.231 100.879 205.336 100.834 205.442 100.778C205.729 100.638 205.991 100.459 206.236 100.242C206.302 100.186 206.373 100.144 206.432 100.082C206.684 99.8195 206.908 99.5256 207.076 99.1815C210.702 91.6562 217.485 89.8266 222.01 91.9114C224.481 93.0485 226.273 95.146 226.927 97.6684C226.959 97.7914 227.042 97.8814 227.088 98.001C227.175 98.2357 227.277 98.4488 227.41 98.6596C227.522 98.835 227.645 98.9888 227.785 99.1392C227.949 99.3147 228.121 99.4685 228.317 99.6086C228.492 99.7351 228.67 99.8331 228.866 99.9231C229.065 100.014 229.265 100.087 229.486 100.144C229.724 100.203 229.959 100.228 230.204 100.235C230.33 100.239 230.442 100.291 230.572 100.284C232.413 100.183 233.876 101.576 234.019 103.445C234.036 103.666 234.131 103.857 234.187 104.065C234.239 104.254 234.261 104.45 234.34 104.625C234.449 104.87 234.617 105.069 234.778 105.279C234.886 105.416 234.964 105.57 235.089 105.691C235.299 105.891 235.551 106.028 235.8 106.171C235.933 106.245 236.038 106.353 236.182 106.409C236.591 106.577 237.036 106.679 237.504 106.679H237.508C238.596 106.679 239.81 108.321 239.81 110.522C239.81 112.727 238.592 114.375 237.508 114.375L203.914 114.374C201.505 114.374 199.476 111.351 199.476 107.77C199.475 104.19 201.508 101.163 203.914 101.163L203.915 101.163Z"
              fill="#008BE6"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

AboutUs.getLayout = getLayout
