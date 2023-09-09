import React from "react";
import {
    LoginPageProps,
    LoginFormTypes,
    useLink,
    useRouterType,
    useActiveAuthProvider,
} from "@refinedev/core";
import {
    Row,
    Col,
    Layout,
    Card,
    Typography,
    Form,
    Input,
    Image,
    Button,
    Checkbox,
    CardProps,
    LayoutProps,
    Divider,
    FormProps,
    theme,
} from "antd";
import { useLogin, useTranslate, useRouterContext } from "@refinedev/core";

import {
    bodyStyles,
    containerStyles,
    headStyles,
    layoutStyles,
    titleStyles,
} from "../styles";

const { Text, Title } = Typography;
const { useToken } = theme;

type LoginProps = LoginPageProps<LayoutProps, CardProps, FormProps>;
/**
 * **refine** has a default login page form which is served on `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/antd-auth-page/#login} for more details.
 */
export const LoginPage: React.FC<LoginProps> = ({
    providers,
    rememberMe,
    contentProps,
    wrapperProps,
    formProps,
}) => {
    const { token } = useToken();
    const [form] = Form.useForm<LoginFormTypes>();
    const translate = useTranslate();
    const routerType = useRouterType();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    const authProvider = useActiveAuthProvider();
    const { mutate: login, isLoading } = useLogin<LoginFormTypes>({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

    const CardTitle = (
        <Title
            level={3}
            style={{
                color: token.colorPrimaryTextHover,
                ...titleStyles,
            }}
        >
            {translate("pages.login.title", "Sign in")}
        </Title>
    );

    const renderProviders = () => {
        if (providers && providers.length > 0) {
            return (
                <>
                    {providers.map((provider) => {
                        return (
                            <Button
                                key={provider.name}
                                type="default"
                                block
                                icon={provider.icon}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    marginBottom: "8px",
                                }}
                                onClick={() =>
                                    login({
                                        providerName: provider.name,
                                    })
                                }
                            >
                                {provider.label}
                            </Button>
                        );
                    })}
                    <Divider>
                        <Text
                            style={{
                                color: token.colorTextLabel,
                            }}
                        >
                            {translate("pages.login.divider", "or")}
                        </Text>
                    </Divider>
                </>
            );
        }
        return null;
    };

    const CardContent = (
        <Card
            title={CardTitle}
            headStyle={headStyles}
            bodyStyle={bodyStyles}
            style={{
                ...containerStyles,
                backgroundColor: token.colorBgElevated,
            }}
            {...(contentProps ?? {})}
        >
            {renderProviders()}
            <Form<LoginFormTypes>
                layout="vertical"
                form={form}
                onFinish={(values) => login(values)}
                requiredMark={false}
                initialValues={{
                    remember: false,
                }}
                {...formProps}
            >
                <Form.Item
                    name="username"
                    label={translate("pages.login.fields.username", "Username")}
                    rules={[
                        { required: true },
                    ]}
                >
                    <Input
                        size="large"
                        placeholder={translate(
                            "pages.login.fields.username",
                            "Username",
                        )}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    label={translate("pages.login.fields.password", "Password")}
                    rules={[{ required: true }]}
                >
                    <Input
                        type="password"
                        placeholder="●●●●●●●●"
                        size="large"
                    />
                </Form.Item>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "24px",
                    }}
                >
                    {rememberMe ?? (
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox
                                style={{
                                    fontSize: "12px",
                                }}
                            >
                                {translate(
                                    "pages.login.buttons.rememberMe",
                                    "Remember me",
                                )}
                            </Checkbox>
                        </Form.Item>
                    )}
                </div>
                <Form.Item>
                    <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={isLoading}
                        block
                    >
                        {translate("pages.login.signin", "Sign in")}
                    </Button>
                </Form.Item>
            </Form>
            <div style={{ marginTop: 8 }}>
                <Text style={{ fontSize: 12 }}>
                    {translate(
                        "pages.login.buttons.noAccount",
                        "No Account?",
                    )}{" "}
                    <ActiveLink
                        to="/guestlogin"
                        style={{
                            fontWeight: "bold",
                            color: token.colorPrimaryTextHover,
                        }}
                    >
                        {translate("pages.login.guestSign", "Sign in as Guest")}
                    </ActiveLink>
                </Text>
            </div>
        </Card>
    );

    return (
        <Layout style={layoutStyles} {...(wrapperProps ?? {})}>
            <Row
                justify="center"
                align="middle"
                style={{
                    height: "100vh",
                }}
            >
                <Col xs={22}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "24px",
                        }}
                    >
                        <Image
                            width={100}
                            src="../../../../../public/images/osiris.png"
                        />
                    </div>
                    {CardContent}
                </Col>
            </Row>
        </Layout>
    );
};
